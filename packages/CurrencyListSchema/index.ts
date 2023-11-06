import { z } from "zod";

export const CurrencySchema = z.object({
  country: z.string(),
  currency: z.string(),
  amount: z.number(),
  currencyCode: z.string(),
  rate: z.number(),
});

export type Currency = z.infer<typeof CurrencySchema>;

export const CurrencyListSchema = z.array(CurrencySchema);
