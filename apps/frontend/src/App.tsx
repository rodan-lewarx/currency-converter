import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  QueryClient,
  QueryClientProvider,
  useQueryErrorResetBoundary,
} from "react-query";
import CurrencyConverter from "./components/CurrencyConverter";

const queryClient = new QueryClient({
  defaultOptions: { queries: { suspense: true } },
});

const App = () => {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <div>
              No currency rates available at this time. Please retry later.
              <button onClick={() => resetErrorBoundary()}>Try again</button>
            </div>
          )}
        >
          <Suspense fallback={<>Loading...</>}>
            <CurrencyConverter />
          </Suspense>
        </ErrorBoundary>
      </QueryClientProvider>
    </>
  );
};

export default App;
