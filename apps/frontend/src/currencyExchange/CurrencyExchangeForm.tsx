import { Currency } from "@task/currency-list-schema";
import { useState } from "react";
import { exchangeCurrency, amountSchema } from "./exchangeCurrency";

export const CurrencyExchangeForm = ({
  currencyList,
}: {
  currencyList: Currency[];
}) => {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState<Currency>(currencyList[0]);
  const [error, setError] = useState("");
  const [result, setResult] = useState("");

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setAmount(e.target.value);

  const handleChangeCurrency = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCurrency = currencyList.find(
      (currency) => currency.currencyCode === e.target.value,
    )!;
    setCurrency(selectedCurrency);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setResult("");
    const validatedAmount = amountSchema.safeParse(amount);
    if (!validatedAmount.success) {
      setError(validatedAmount.error.issues[0]?.message);
      return;
    }
    const result = exchangeCurrency(validatedAmount.data, currency);
    setResult(result);
    return;
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={handleChangeAmount}
        />
        <select value={currency.currencyCode} onChange={handleChangeCurrency}>
          {currencyList.map((currency) => (
            <option key={currency.currencyCode} value={currency.currencyCode}>
              {currency.currencyCode}
            </option>
          ))}
        </select>
        <button type="submit">Convert</button>
        {error && <p>{error}</p>}
        {result && (
          <p>{`${amount} CZK = ${result} ${currency.currencyCode}`}</p>
        )}
      </form>
    </>
  );
};
