import { useCurrencyListQuery } from "./api/useCurrencyListQuery";

const App = () => {
  const currencyList = useCurrencyListQuery();

  return (
    <>
      <h1>Currency Converter App</h1>
      <code>{JSON.stringify(currencyList)}</code>
    </>
  );
};

export default App;
