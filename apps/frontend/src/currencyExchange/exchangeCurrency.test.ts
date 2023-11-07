import { describe, expect, it } from "vitest";
import { exchangeCurrency } from "./exchangeCurrency";

const HUF = {
  country: "Hungary",
  currency: "Hungarian Forint",
  amount: 100,
  currencyCode: "HUF",
  rate: 6.438,
};

const USD = {
  country: "United States",
  currency: "US Dollar",
  amount: 1,
  currencyCode: "USD",
  rate: 22.781,
};

const AMOUNT = 1000;

describe("exchangeCurrency", () => {
  it("should calculate exchange rate", () => {
    const result = exchangeCurrency(AMOUNT, USD);
    expect(result).toBe("43.90");
  });

  it("should calculate exchange rate with amount > 1", () => {
    const result = exchangeCurrency(AMOUNT, HUF);
    expect(result).toBe("15532.77");
  });
});
