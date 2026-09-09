# Currency converter

## Running locally

1. Install dependencies from the project directory:

   ```sh
   pnpm install
   ```

2. Create a free [CurrencyBeacon account](https://currencybeacon.com/register) and copy your API key from the dashboard.

3. Create a file named `.env.local` in the project root, next to `package.json`, and add your key:

   ```dotenv
   CURRENCYBEACON_API_KEY=your_currencybeacon_api_key
   ```

4. Start the development server:

   ```sh
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).

Restart the development server after changing `.env.local`.

## Running a production build

With a valid API key configured in `.env.local`, run:

```sh
pnpm build
pnpm start
```

The production server also runs at [http://localhost:3000](http://localhost:3000). The API key is required during both the build and runtime.

## Running tests

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

## Architectural decision log

### Fetch the currency list on the server

We fetch and cache the currency list on the server because it changes rarely. This
makes the options available when the page loads and avoids overfetching the same, rather stale data.
I also wanted to demonstrate that I know the difference between client and server components.

### Request conversions from the browser

The conversion happens on the client. The exchange rates are chaning frequently so we always have recent rates.
I added small debounce to avoid spamming server with request on every input field change.
`tanstack-queery` has disabled caching because we always want to have fresh rates.

### Libraries and tools
Initially, I wrote UI components myself, but I decided to swtich to shadcn primitives later, because
the task description was enouraging to use libraries and tools, and because it was in the company tech-stack.
Besides, it gives you a lot of good stuff (accessibility, browser compatibility etc) out of the box.

I used NextJS because it was in the tech stack that company uses, same with `tanstack-queery`.
Second reason I wanted to demonstrate my familiarity with this library. And last but not least, It allowed to to write simpler
and more compact code, that was easy to encapuslate in the dedicated hook.
