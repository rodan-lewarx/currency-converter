import { useQuery } from "react-query";

const CurrencyConverter = () => {
  const { data: currencyList } = useQuery("currencyList", () =>
    fetch(
      "https://currency-converter-be.netlify.app/.netlify/functions/getCurrencyRates"
    ).then((res) => res.json())
  );

  console.log(currencyList);

  return (
    <>
      <h1>Currency Converter App</h1>
      <code>{JSON.stringify(currencyList)}</code>
    </>
  );
};

export default CurrencyConverter;
