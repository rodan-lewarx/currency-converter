import { describe, expect, it } from "vitest";
import { Effect, pipe } from "effect";
import {
  splitDataIntoRows,
  removeEmptyLines,
  removeHeaders,
  parseRows,
  returnResponse,
  handleError,
} from "./effects";

const testData = `06 Nov 2023 #214
Country|Currency|Amount|Code|Rate
United Kingdom|pound|1|GBP|28.222
USA|dollar|1|USD|22.781`;

const successResult = {
  body: JSON.stringify([
    {
      country: "United Kingdom",
      currency: "pound",
      amount: 1,
      currencyCode: "GBP",
      rate: 28.222,
    },
    {
      country: "USA",
      currency: "dollar",
      amount: 1,
      currencyCode: "USD",
      rate: 22.781,
    },
  ]),
  statusCode: 200,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
};

const errorData = {
  body: JSON.stringify({ error: "Failed to fetch data" }),
  statusCode: 500,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
};

export const successFetchAndParse = Effect.orElseSucceed(
  pipe(
    Effect.succeed(testData),
    Effect.map(splitDataIntoRows),
    Effect.map(removeEmptyLines),
    Effect.map(removeHeaders),
    Effect.map(parseRows),
    Effect.map(returnResponse),
  ),
  handleError,
);

export const errorFetchAndParse = Effect.orElseSucceed(
  pipe(
    Effect.fail(new Error("Failed to fetch data")),
    Effect.map(splitDataIntoRows),
    Effect.map(removeEmptyLines),
    Effect.map(removeHeaders),
    Effect.map(parseRows),
    Effect.map(returnResponse),
  ),
  handleError,
);

describe("fetch and parse data", () => {
  it("returns valid response with status 200 and parsed data", () => {
    const result = Effect.runSync(successFetchAndParse);
    expect(result).toEqual(successResult);
  });

  it("returns error response with status 500", () => {
    const result = Effect.runSync(errorFetchAndParse);
    expect(result).toEqual(errorData);
  });
});
