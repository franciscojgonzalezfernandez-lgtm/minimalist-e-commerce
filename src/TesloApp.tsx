import { RouterProvider } from "react-router";
import { appRouter } from "./app.router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { Toaster } from "sonner";
import { checkStatus } from "./auth/actions/check-status.actions";
import type { PropsWithChildren } from "react";
import { CustomLoader } from "./components/CustomLoader";

const queryClient = new QueryClient();

const CheckAuthProvider = ({ children }: PropsWithChildren) => {
  const { isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: checkStatus,
    retry: false,
    refetchInterval: 1000 * 60 * 1.5,
  });

  if (isLoading) {
    return <CustomLoader />;
  }
  return children;
};

export const TesloApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CheckAuthProvider>
        <Toaster />
        <RouterProvider router={appRouter} />
      </CheckAuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
