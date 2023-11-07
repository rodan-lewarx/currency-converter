import { describe, expect, it, afterEach } from "vitest";
import { CurrencyList } from "./CurrencyList";
import { render, cleanup } from "@testing-library/react";

/**
 * @vitest-environment jsdom
 */

const currencyList = [
  {
    country: "United Kingdom",
    currency: "pound sterling",
    amount: 1,
    currencyCode: "GBP",
    rate: 28.222,
  },
  {
    country: "United States",
    currency: "US Dollar",
    amount: 1,
    currencyCode: "USD",
    rate: 22.781,
  },
];

afterEach(async () => {
  cleanup(); // clear testing data after each test run
});

describe("CurrencyList", () => {
  it("should render a table", () => {
    const table = render(<CurrencyList currencyList={currencyList} />);
    expect(table).toMatchSnapshot();
  });
});
