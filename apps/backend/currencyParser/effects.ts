import { z } from "zod";
import { Effect, pipe } from "effect";

const schema = z.tuple([
  z.string(),
  z.string(),
  z.coerce.number(),
  z.string(),
  z.coerce.number(),
]);

export const fetchData = Effect.tryPromise({
  try: () =>
    fetch(
      "https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt"
    ).then((response) => response.text()),
  catch: () => new Error("Failed to fetch data"),
});

export const splitDataIntoRows = (data: string) => data.split("\n");

export const removeEmptyLines = (rows: string[]) =>
  rows.filter((row) => row.trim().length > 0);

export const removeHeaders = (rows: string[]) => rows.slice(2);

export const parseRows = (rows: string[]) =>
  rows.reduce((acc, row) => {
    const columns = row.split("|");
    const result = schema.safeParse(columns);

    if (result.success) {
      const [country, currency, amount, currencyCode, rate] = result.data;

      acc.push({
        country: country,
        currency: currency,
        amount: amount,
        currencyCode: currencyCode,
        rate: rate,
      });
    } else {
      Effect.logWarning(`Invalid row data: ${result.error.message}}`);
    }
    return acc;
  }, [] as any);

export const returnResponse = (data: any) => ({
  body: JSON.stringify(data),
  statusCode: 200,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

export const handleError = () => ({
  body: JSON.stringify({ error: "Failed to fetch data" }),
  statusCode: 500,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

export const fetchAndParseData = Effect.orElseSucceed(
  pipe(
    fetchData,
    Effect.map(splitDataIntoRows),
    Effect.map(removeEmptyLines),
    Effect.map(removeHeaders),
    Effect.map(parseRows),
    Effect.map(returnResponse)
  ),
  handleError
);
