import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";

import Root from "pages/root";

export const queryClient = new QueryClient();

const LoginPage = lazy(() => import("pages/login"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <div>Not Found Page..!!</div>,
    children: [{}],
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={'...로그인 페이지 로딩 중'}>
        <LoginPage />
      </Suspense>
    ),
  },
]);

export default appRouter;
