import { useQuery } from "react-query";

const ENDPOINT_URL = import.meta.env.VITE_ENDPOINT_URL;

const CurrencyConverter = () => {
  const { data: currencyList } = useQuery("currencyList", async () => {
    const response = await fetch(ENDPOINT_URL);
    const data = await response.json();

    if (data.length === 0) {
      throw new Error("No data found");
    } else {
      return data;
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
