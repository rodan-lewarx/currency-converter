# Currency Converter test task

## Deployed solution

- FE is deployed at https://currency-converter-fe.netlify.app
- BE is deployed at https://currency-converter-be.netlify.app/.netlify/functions/getCurrencyRates

## Dev environment setup

1. create env files in `apps/frontend/.env` and `apps/backend/.env` based on the example files in the same location
2. `yarn` to install dependecies
3. `yarn dev` to run dev environment (Netlify CLI might be needed and initialized for the backend part to work properly)
4. tasks for linting, testing, typechecking are in the package.json in the root.
5. FE runs on `http://localhost:5173/` and BE is available on `http://localhost:3001/.netlify/functions/getCurrencyRates`

## Task description

> Create a simple React app (don’t use NextJS please), which:
>
> 1. When it starts, retrieve the latest currency exchange rates from the Czech National Bank.
>
>    API URL: https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt
>
>    Documentation: https://www.cnb.cz/en/faq/Format-of-the-foreign-exchange-market-rates/
>
> 2. Parses the downloaded data and clearly displays it to the user in the UI.
> 3. Add a simple form, into which the customer can enter an amount in CZK and select a currency, and after submitting (clicking a button or in real-time) sees the amount entered in CZK converted into the selected currency.
> 4. Commit your code throughout your work and upload the resulting codebase into a Github repo.
> 5. Deploy the app so it can be viewed online (it doesn’t matter where - e.q. Vercel, Netflify, etc.).
> 6. Tech stack: React (+ Hooks), TypeScript, [Styled Components](https://styled-components.com/), [React Query](https://www.npmjs.com/package/@tanstack/react-query).
>
> Overall: Keep the code simple and the UI nice and easy to use for the user.

## Solution

- In the repository is a yarn workspaces monorepo with two appllications - backend (netlify function for parsing and fetching the currency rate) and frontend (react app created with create vite app) and one shared package (zod type schema and shared type for Currency)
- BE uses:
  - Netlify function to fetch, parse, format and return the data
  - Effecct.ts
- FE uses:
  - Styled Components for styling
  - ReactQuery for data fetching (with suspense)
  - Vite as a bundler
  - Vitest as test runner
