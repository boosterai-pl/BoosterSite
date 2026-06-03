# E2E and Platform Rules

## Contents

- Web E2E Structure
- data-testid Convention
- Backend E2E and Isolation
- Integration Test DDL
- Binary Fixtures
- Failure Debugging

## Web E2E Structure

Playwright E2E tests live directly under the project's `e2e/` directory. Feature-specific helpers, mocks, and fixtures use sub-directories:

```text
e2e/
  base.ts
  global-setup.ts
  <feature>.spec.ts
  <feature>/
    fixtures/
    helpers/
    mocks/
  showcase/
```

Split E2E files when they exceed ~500 lines or cover distinct behavioral aspects:

| Pattern | Use Case |
| --- | --- |
| `{module}.spec.ts` | Core behavior, happy paths, edge cases |
| `{module}.integration.spec.ts` | Multi-service integration |
| `{module}.{scenario}.spec.ts` | Specific scenarios |

## data-testid Convention

Use `data-testid` only when semantic locators are not enough.

- Naming: kebab-case, semantic over structural.
- List items: `{entity}-row-{id}`.
- Inputs: `input-{fieldName}`.
- Select triggers: `select-{fieldName}-trigger`.
- Errors: `field-{fieldName}-error`.

Discover current values with:

```bash
rg -o 'data-testid="[^"]+"' src -g '*.tsx' | sort -u
```

## Backend E2E and Isolation

- After `vi.clearAllMocks()` in shared `resetMocks()` helpers, re-seed every infrastructure mock the app can call, including teardown-only methods like `quit`, `disconnect`, and `dispose`.
- In `afterAll`, call `app.getHttpServer().closeAllConnections()` before `await app.close()` (NestJS pattern).
- Specs that boot an application module must mock infrastructure adapters (ioredis, queue adapters, etc.) when used.
- `socket hang up` or `ECONNRESET` from supertest on shared runners is usually environmental. Use `vitest retry: 2` before treating it as a product bug.

If the project uses NestJS with `unplugin-swc`:

- Never use `import type` for DI-injected classes.
- Never patch `Reflect.defineMetadata` manually.
- Mock infra at module level with `vi.mock(...)`.

## Integration Test DDL

Share test DDL from a helpers directory instead of copy-pasting `CREATE TABLE` blocks.

```typescript
export const USERS_DDL = sql`CREATE TABLE IF NOT EXISTS users ( ... )`;
export async function setupUsersTable(db: DrizzleDb) {
  await db.execute(USERS_DDL);
}
```

DB integration tests run against real Postgres. Do not mock the database.

## Binary Fixtures

Binary fixtures live in the project's `e2e/<feature>/fixtures/` directory, are committed to git, and are generated ahead of time. Do not generate them per test run.

## Failure Debugging

Fix one failing test at a time.

1. Run the single failing test: `pnpm vitest run -t "test name"`
2. Read the error and identify root cause
3. Fix and re-run
4. Move to the next failure
5. Run the full suite only after isolated failures pass
