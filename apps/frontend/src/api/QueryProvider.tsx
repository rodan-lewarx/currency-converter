import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  QueryClient,
  QueryClientProvider,
  useQueryErrorResetBoundary,
} from "react-query";

export const QueryProvider = ({
  children,
  queryClient,
}: {
  children: React.ReactNode;
  queryClient: QueryClient;
}) => {
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
          <Suspense fallback={<>Loading...</>}>{children}</Suspense>
        </ErrorBoundary>
      </QueryClientProvider>
    </>
  );
};
