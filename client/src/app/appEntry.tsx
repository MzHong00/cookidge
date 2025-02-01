import { RouterProvider } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import appRouter from "./appRouter";

import "./app.scss";

const ONE_HOUR = 60 * 60 * 1000;

const AppEntry = () => {
  const queryClient = new QueryClient({
    defaultOptions:{
      queries: {
        throwOnError: true,
        staleTime: ONE_HOUR
      }
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <RouterProvider router={appRouter} />
      </CookiesProvider>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
};

export default AppEntry;
