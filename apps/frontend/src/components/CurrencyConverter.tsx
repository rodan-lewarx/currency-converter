import { useQuery } from "react-query";
import { CurrencyListSchema } from "@task/currency-list-schema";

const ENDPOINT_URL = import.meta.env.VITE_ENDPOINT_URL;

const CurrencyConverter = () => {
  const { data: currencyList } = useQuery("currencyList", async () => {
    const response = await fetch(ENDPOINT_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    const parsedData = CurrencyListSchema.parse(data);

    if (parsedData.length === 0) {
      throw new Error("Failed to fetch data");
    } else {
      return parsedData;
    }
  });

  return (
    <>
      <h1>Currency Converter App</h1>
      <code>{JSON.stringify(currencyList)}</code>
    </>
  );
};

export default CurrencyConverter;
