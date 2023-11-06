import { useCurrencyListQuery } from "./api/useCurrencyListQuery";
import { CurrencyExchangeForm } from "./currencyExchange/CurrencyExchangeForm";
import { CurrencyList } from "./currencyList/CurrencyList";

const App = () => {
  const currencyList = useCurrencyListQuery();

  return (
    <>
      <h1>Currency Converter App</h1>
      <CurrencyList currencyList={currencyList ?? []} />
      <CurrencyExchangeForm currencyList={currencyList ?? []} />
    </>
  );
};

export default App;
