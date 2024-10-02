import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";

import Root from "pages/root";
import { Home } from "pages/home";
import { Dashboard } from "pages/dashboard";

export const queryClient = new QueryClient();

const LoginPage = lazy(() => import("pages/login"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
    errorElement: <div>Not Found Page..!!</div>,
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={"...로그인 페이지 로딩 중"}>
        <LoginPage />
      </Suspense>
    ),
  },
]);

export default appRouter;
