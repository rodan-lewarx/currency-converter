import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  QueryClient,
  QueryClientProvider,
  useQueryErrorResetBoundary,
} from "react-query";
import { Heading, Button } from "../ui-components";

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
            <>
              <Heading>There was an error</Heading>
              <p>
                No currency rates available at this time. Please retry later.
              </p>
              <Button onClick={() => resetErrorBoundary()}>Try again</Button>
            </>
          )}
        >
          <Suspense fallback={<Heading>Loading...</Heading>}>
            {children}
          </Suspense>
        </ErrorBoundary>
      </QueryClientProvider>
    </>
  );
};
