import { useQuery } from "react-query";

const CurrencyConverter = () => {
  const currencyList = useQuery("currencyList", () =>
    fetch(
      "https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt"
    ).then((res) => res.text())
  );

  console.log(currencyList);

  return <h1>Currency Converter App</h1>;
};

export default CurrencyConverter;
