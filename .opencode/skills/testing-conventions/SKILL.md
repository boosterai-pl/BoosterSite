---
name: testing-conventions
description: Use when writing, modifying, or reviewing test files; deciding whether a test is worth adding; triaging a "missing test" or test-quality review comment; or answering questions about test file location, naming, assertions, mocking, isolation, Vitest, or flaky test debugging. Includes the value gate, what not to test, mock factory rules, and mock.calls history.
compatibility: opencode
metadata:
  schemaVersion: "1"
  version: "1.0.0"
  stability: stable
  category: workflow
  appliesTo: any
---

## Contents

- Quick Checklist
- File Location and Naming
- File Sizing
- Test Naming
- File-Level Doc Comments
- Test Structure
- Assertions
- Mocking
- Test Isolation and Cleanup
- Mock Factories
- What NOT to Test
- Vitest Patterns
- Reference Files

## Quick Checklist

Copy and track before writing tests:

- [ ] **Every test passes the value gate: "Would this catch a bug that types or the library's own tests don't?"** If no → skip it. This overrides all other conventions.
- [ ] Test file <= 150 lines (hard target), <= 300 lines (absolute max)
- [ ] Test names: `{action} {outcome} [condition]` -- no filler words
- [ ] JSDoc block at top with key behaviors
- [ ] `describe` nesting <= 2 levels deep
- [ ] Domain objects from shared `.mock.ts` files, not inline
- [ ] Named presets for common variants (`mockAdminUser()`, `mockExpiredToken()`)
- [ ] Multi-mock setups extracted into `setup*()` helpers
- [ ] Assertions use exact values, not existence checks
- [ ] Expected values are hardcoded literals, not derived from production code
- [ ] Mocks only at I/O boundaries (DB, Redis, HTTP, queues)
- [ ] No `as any` -- use `as unknown as RealType`
- [ ] No `test.skip()` or commented-out tests
- [ ] No tautological tests or mock-echo tests
- [ ] No schema-smoke, passthrough-delegation, or per-field-repetition tests
- [ ] Setup-to-assertion ratio is reasonable (not 5x+ setup for trivial assertion)
- [ ] Clean state in `beforeEach`, not `afterEach`

## File Location and Naming

Test files go in `__tests__/` subdirectories, never alongside source files.

| Package type                              | Extension                | Example                                        |
| ----------------------------------------- | ------------------------ | ---------------------------------------------- |
| Backend apps (API, worker)                | `.spec.ts`               | `src/health/__tests__/health.service.spec.ts`  |
| Packages, frontend apps                   | `.test.ts` / `.test.tsx` | `src/__tests__/inventory.test.ts`              |

Check the project's `AGENTS.md` for the exact convention used in the codebase.

## File Sizing

| Threshold     | Action                                          |
| ------------- | ----------------------------------------------- |
| <= 150 lines  | Good.                                           |
| 151-300 lines | Extract helpers. Review for duplication.        |
| > 300 lines   | Must refactor before merging. Split or extract. |

Applies to new and modified test files. Don't refactor unrelated files.

## Test Naming

Pattern: `{action} {outcome} [condition]`. Drop filler words ("should", "correctly", "properly").

```typescript
// GOOD
it('returns ok when both DB and Redis are up', ...);
it('rejects reservation when slot is already sold', ...);
it('throws ValidationError for negative price', ...);

// BAD
it('should work correctly', ...);
it('should handle reservations', ...);
it('basic test', ...);
```

## File-Level Doc Comments

Every test file starts with a JSDoc block:

```typescript
/**
 * ReservationService Tests
 *
 * Verifies reservation lifecycle transitions and conflict detection.
 *
 * Key behaviors:
 * - FREE -> OPTION -> RESERVED -> SOLD transitions
 * - Rejects double-booking on same slot
 * - TTL expiry rolls back to FREE
 */
```

## Test Structure

### Flat Over Nested

Use `describe()` to group distinct behavioral categories. Max 2 levels of nesting.

### setup() Over beforeEach for Data

Use `setup()` functions returning destructured objects. Reserve `beforeEach` only for cleanup that must run even on failure, or when 3+ tests share identical setup.

```typescript
function setup() {
  const mockDb = { execute: vi.fn() };
  const mockRedis = { ping: vi.fn() };
  const service = new HealthService(mockDb as unknown as DrizzleDb, mockRedis as unknown as Redis);
  return { service, mockDb, mockRedis };
}

it('returns ok when both deps respond', async () => {
  const { service, mockDb, mockRedis } = setup();
  mockDb.execute.mockResolvedValue([{ result: 1 }]);
  mockRedis.ping.mockResolvedValue('PONG');
  expect(await service.check()).toEqual({ status: 'ok' });
});
```

### beforeEach Rules

- 3+ tests with identical setup -> `beforeEach`
- Module-level constants for values that never change
- Reset mocks: `vi.clearAllMocks()`
- Never put assertions in `beforeEach`

## Assertions

- `toMatchObject` over `toEqual` for subset assertions
- `rejects.toMatchObject` over try/catch for error assertions
- `toHaveBeenCalledWith(...)` over `toHaveBeenCalled()` when args matter
- Assert exact values, not existence (`toBeDefined()`, `toBeTruthy()`)
- Hardcode expected values -- never derive them from production code

## Mocking

Mock external dependencies (DB, Redis, HTTP, queues). Use real implementations for internal utilities, validators, formatters.

No `as any` -- use `as unknown as RealType` with typed mock factories.

Exception for runtime error testing (add a comment):

```typescript
// Testing runtime error for invalid input -- bypasses TypeScript intentionally
expect(() => service.process('bad' as any)).toThrow(/invalid/);
```

Full patterns for `.mock.ts` files, factory naming, service mocks, constructor mocks, and cross-package import conventions: [references/MOCK-PATTERNS.md](references/MOCK-PATTERNS.md)

## Test Isolation and Cleanup

- Clean state in `beforeEach`, not `afterEach` (failed tests still leave clean state for next test)
- Use unique identifiers when tests share infrastructure (queue names, consumer groups)
- `afterAll`: close connections, restore timers
- `afterEach`: only for cleanup that must run even on failure (spy restoration)
- Each test runs independently -- no ordering dependencies, no shared mutable state

## Mock Factories (mandatory)

Domain objects matching a shared contracts schema MUST be constructed via shared factory functions, never inline. This prevents a schema field addition from rippling across dozens of test files.

**Rules:**

- Each test directory that mocks a shared schema MUST use a `*.factories.ts` or `*.mock.ts` file with factory functions -- never construct the schema shape inline in a test.
- Factory functions MUST follow the package's existing convention consistently: either `mock<Type>(overrides?: Partial<T>)` or `make<Type>(overrides?: Partial<T>)`. Do not mix both styles within the same package.
- Defaults: `null` for nullable fields, `0` for numbers, `''` for strings, `false` for booleans, `[]` for arrays.
- When a new field is added to a contracts schema, update the factory defaults. Zero test files should break.
- Factory files are the ONLY place the full default shape is maintained per package.

Factory placement and examples: [references/MOCK-PATTERNS.md](references/MOCK-PATTERNS.md)

## What NOT to Test

Before writing a test, ask: **"Would this catch a bug that types or the library's own tests don't?"** No -> skip it.

- **Schema smoke** -- Don't test Zod `safeParse` on valid/invalid input unless the schema has custom `.refine()`, `.transform()`, or `discriminatedUnion`.
- **Passthrough delegation** -- Don't test that a controller returns what the service returns when there's no transformation or branching.
- **Per-field repetition** -- Don't write N tests for N fields on the same code path. One test with multiple assertions.
- **Framework behavior** -- Don't test framework routing, React rendering, TanStack Query caching, or ORM SELECTs.
- **Tautological** -- `toHaveBeenCalled()` when sibling asserts `toHaveBeenCalledWith(...)`
- **Mock echo** -- asserting a mock returns what you told it to return
- **Excessive mock wiring** -- if setup is 5x+ the assertion code, prefer integration/e2e test instead

| Zod scenario | Test? |
|---|---|
| `.refine()` / `.superRefine()` with custom logic | Yes |
| `.transform()` that reshapes data | Yes |
| `z.discriminatedUnion` or conditional parsing | Yes |
| Factory function where a **parameter** controls the limit (e.g. `createSchema(max)` → test that `max` is wired to `.max()`) | Yes |
| `z.object({...}).partial()` with only primitives | No |
| Built-in validator (`.email()`, `.uuid()`, `.min()`, `.max()`, `.default()`) with a **hardcoded** value | No |
| `z.coerce.number()` / `z.coerce.string()` string coercion | No |
| Enum rejects invalid value | No |

## Vitest Patterns

- `vi.fn()` for mocks, `Mocked<T>` (from `vitest`) for typed mock objects
- `vi.mock()` at module level for infrastructure (postgres, ioredis, drizzle)
- `globals: true` (project default) -- explicit vitest imports preferred for portability
- `vi.useFakeTimers()` for time-dependent tests, always restore in `afterEach`
- Constructor mocks and `mock.calls` history patterns: [references/MOCK-PATTERNS.md](references/MOCK-PATTERNS.md)

## Reference Files

- Mock factories, constructor mocks, `mock.calls`, and mock structure: [references/MOCK-PATTERNS.md](references/MOCK-PATTERNS.md)
- E2E structure, `data-testid`, NestJS e2e, DDL reuse, fixtures, and flaky test handling: [references/E2E-AND-PLATFORM-RULES.md](references/E2E-AND-PLATFORM-RULES.md)
