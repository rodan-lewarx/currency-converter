import { Currency } from "@task/currency-list-schema";
import { z } from "zod";

export const amountSchema = z.coerce
  .number({
    invalid_type_error: "Amount must be positive number.",
    required_error: "Amount must be positive number.",
  })
  .positive({ message: "Amount must be positive number." });

export const exchangeCurrency = (amount: number, currency: Currency) => {
  const result = (amount / currency.rate) * currency.amount;
  return result.toFixed(2);
};
