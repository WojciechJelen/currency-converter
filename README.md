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
makes the options available when the page loads and avoids repeatedly fetching the same data.
I also wanted to demonstrate my understanding of client and server components.

### Request conversions from the browser

Conversion requests start in the browser, and the server gets the converted amount from CurrencyBeacon.
Exchange rates can change, so I configured TanStack Query to request fresh results instead of reusing previous ones.
I added a short debounce to avoid sending a request on every keystroke.

### Libraries and tools

Initially, I wrote the UI components myself, but I later switched to `shadcn/ui` because
the task encouraged using libraries and tools, and it is part of the company's tech stack.
It also provides accessibility and browser compatibility features out of the box.

I used Next.js and TanStack Query because both are part of the company's tech stack.
I also wanted to demonstrate my familiarity with them. TanStack Query helped me keep
the conversion logic simple and contained in a dedicated hook.


### Extra features
I implemented bi-directional conversion, to implment it closer to google currencies converter.
