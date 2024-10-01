import { RouterProvider } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { QueryClientProvider } from "@tanstack/react-query";

import appRouter, { queryClient } from "./appRouter";

import "./app.css";

const AppEntry = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <RouterProvider router={appRouter} />
      </CookiesProvider>
      {/* <ReactQueryDevtools initialIsOpen /> */}
    </QueryClientProvider>
  );
};

export default AppEntry;
