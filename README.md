# Currency converter

## Running tests

Use Node.js 24.15+ and pnpm 10.

```sh
pnpm install
pnpm test
```

The tests use fixed API responses. No API key or running Next.js server is needed.

- [validation.test.ts](tests/validation.test.ts) checks valid amounts and rejects invalid amounts and currency codes.
- [currency-api.test.ts](tests/currency-api.test.ts) checks currency mapping, conversion requests, and API error responses.
- [currency-converter.test.tsx](tests/currency-converter.test.tsx) checks amount entry, currency selection, reverse conversion, validation feedback, error recovery, and requests finishing out of order.

Vitest runs all three files. The UI tests use React Testing Library and jsdom to render the converter with its real components, conversion hook, and query provider. Only network requests are replaced with test responses; the API tests also stub Next.js's `server-only` import marker.

To run just the UI tests:

```sh
pnpm test tests/currency-converter.test.tsx
```
