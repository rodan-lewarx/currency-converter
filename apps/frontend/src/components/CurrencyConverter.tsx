import { useQuery } from "react-query";

const ENDPOINT_URL = import.meta.env.VITE_ENDPOINT_URL;

const CurrencyConverter = () => {
  const { data: currencyList } = useQuery("currencyList", () =>
    fetch(ENDPOINT_URL).then((res) => res.json())
  );

  return (
    <>
      <h1>Currency Converter App</h1>
      <code>{JSON.stringify(currencyList)}</code>
    </>
  );
};

export default CurrencyConverter;
