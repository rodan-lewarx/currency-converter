import { useCurrencyListQuery } from "./api/useCurrencyListQuery";
import { CurrencyExchangeForm } from "./currencyExchange/CurrencyExchangeForm";
import { CurrencyList } from "./currencyList/CurrencyList";
import { Heading, PageLayout } from "./ui-components";

const App = () => {
  const currencyList = useCurrencyListQuery();

  return (
    <PageLayout>
      <Heading>Currency Converter App</Heading>
      <CurrencyExchangeForm currencyList={currencyList} />
      <CurrencyList currencyList={currencyList} />
    </PageLayout>
  );
};

export default App;
