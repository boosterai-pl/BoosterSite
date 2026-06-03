# Mock Patterns

Factory functions, `.mock.ts` files, service mocks, setup helpers, call wrappers, and constructor mock patterns.

## Contents

- Mock File Location
- Factory Naming
- Factory Structure
- Import Patterns
- Service Mocks
- Setup Helpers
- Call Wrappers
- Constructor Mocks
- Mock Call History

## Mock File Location

Domain object factories live in centralized `.mock.ts` files — never inline in test files.

| Scope          | Location                                                        | When                                                          |
| -------------- | --------------------------------------------------------------- | ------------------------------------------------------------- |
| Cross-boundary | `packages/contracts/src/__tests__/mocks/<domain>.mock.ts`       | Types from the shared contracts package used in 2+ packages   |
| Package-local  | `<package>/src/__tests__/mocks/<domain>.mock.ts`                | Types specific to one package (request objects, DB rows)      |

Check the project's `AGENTS.md` for the exact conventions in your codebase.

## Factory Naming

- File: `<domain>.mock.ts` (e.g., `user-profile.mock.ts`, `jwt-payload.mock.ts`)
- Base factory: `mock<Type>()` — returns a valid default
- Preset variants: `mock<Adjective><Type>()` — calls base with semantic overrides
- All accept optional `Partial<T>` overrides as last parameter

## Factory Structure

```typescript
// packages/contracts/src/__tests__/mocks/user-profile.mock.ts
import type { UserProfile } from '../../schemas/auth';

export function mockUser(overrides?: Partial<UserProfile>): UserProfile {
  return {
    id: 1,
    email: 'user@test.com',
    name: 'Test User',
    role: 'sales',
    department: null,
    ...overrides,
  };
}

export function mockAdminUser(overrides?: Partial<UserProfile>): UserProfile {
  return mockUser({ role: 'admin', ...overrides });
}

export function mockInactiveUser(overrides?: Partial<UserProfile>): UserProfile {
  return mockUser({ isActive: false, ...overrides } as Partial<UserProfile>);
}
```

Rules:

- One `.mock.ts` per domain aggregate (not per test file)
- Base factory returns the most common valid state
- Presets encode business meaning — `mockExpiredToken()` not `mockToken({ expiresAt: past })`
- Never import from app packages into shared contracts mocks
- Re-export from `__tests__/mocks/index.ts` barrel for clean imports

## Import Patterns

Cross-boundary (any test file in the monorepo):

```typescript
import { mockUser, mockAdminUser } from '@scope/contracts/__tests__/mocks';
```

Package-local:

```typescript
import { mockRequest, mockRefreshRequest } from '../mocks/request.mock';
```

## Service Mocks

Use manual `vi.fn()` factories typed with `Mocked<T>`:

```typescript
import type { Mocked } from 'vitest';
import type { AuthService } from '../auth.service';

function createMockAuthService(): Mocked<AuthService> {
  return {
    validateUser: vi.fn(),
    generateTokens: vi.fn(),
    storeRefreshToken: vi.fn(),
    // ... all public methods
  } as unknown as Mocked<AuthService>;
}
```

When a service has many methods, extract into a `.mock.ts` file in the package-local `__tests__/mocks/` directory.

## Setup Helpers

When 3+ mocks configure a single action, extract a named helper:

```typescript
function setupValidLogin(authService: Mocked<AuthService>) {
  authService.validateUser.mockResolvedValue(mockUser());
  authService.generateTokens.mockResolvedValue(mockTokensResult());
  authService.storeRefreshToken.mockResolvedValue(undefined);
  authService.hashToken.mockReturnValue('hashed-token');
}
```

For variants, accept parameters:

```typescript
function setupValidRefresh(authService: Mocked<AuthService>, opts?: { revoked?: boolean }) {
  authService.findRefreshToken.mockResolvedValue(mockRefreshToken({ isRevoked: opts?.revoked }));
  authService.findUserById.mockResolvedValue(mockUser());
  authService.generateTokens.mockResolvedValue(mockTokensResult());
}
```

## Call Wrappers

When tests repeat the same constant arguments, extract a wrapper:

```typescript
function callGuard(token: string | null, pathname: string) {
  return handleRootAuthGuard({
    accessToken: token,
    pathname,
    refresh: mockRefresh,
    throwRedirect: mockThrow,
  });
}
```

## Constructor Mocks

Since vitest 4, mocks called with `new` construct the instance instead of calling `mock.apply`. Arrow functions are not constructors and throw `<anonymous> is not a constructor` at runtime.

Use the `function` keyword (never arrow functions) in `mockImplementation` whenever the mock is instantiated with `new`:

```typescript
// GOOD
vi.mock('ioredis', () => ({
  default: vi.fn().mockImplementation(function () {
    return { ping: mockPing, quit: mockQuit };
  }),
}));

// BAD -- arrow function is not a constructor
vi.mock('ioredis', () => ({
  default: vi.fn().mockImplementation(() => ({ ping: mockPing, quit: mockQuit })),
}));
```

This applies to any class mocked via `vi.mock()` that code instantiates with `new` — including injected services, ioredis, AWS SDK clients, etc.

## E2E Mock Data Validation Against Contract Schemas

Validate E2E mock data against shared Zod schemas before committing.

**Pattern: parse-and-assert in the mock file**

```typescript
// apps/web/e2e/my-feature/mocks/item.mock.ts
import { ItemDetailResponseSchema } from '@scope/contracts';

const raw = {
  data: {
    id: 1,
    name: 'Test Item',
    // ... all fields
  },
};

// Validate at import time so a broken mock fails immediately, not during the test
const parsed = ItemDetailResponseSchema.safeParse(raw);
if (!parsed.success) {
  throw new Error(`Mock data failed schema validation:\n${parsed.error.toString()}`);
}

export const mockItemDetail = raw;
```

Rules:
- Never use `as SomeType` casts on mock literal objects — they bypass schema checks.
- Run the contracts package tests after editing schemas to catch broken mocks before E2E tests run.
- If the schema is not exported from the contracts package, add the export rather than duplicating the schema inline.

## Mock Call History

`vi.restoreAllMocks()` restores spy implementations but does not clear call history. When a test reads `mock.calls`, call `mockFn.mockClear()` (or `vi.clearAllMocks()`) in `beforeEach` to prevent stale calls from earlier tests polluting the count:

```typescript
const mockFetch = vi.fn();

beforeEach(() => {
  mockFetch.mockClear();
  vi.stubGlobal('fetch', mockFetch);
});

afterEach(() => {
  vi.restoreAllMocks();
});
```

Without `mockClear`, `mock.calls[0]` in test N picks up the call recorded in test 1.
