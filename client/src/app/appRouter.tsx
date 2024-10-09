import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";

import Root from "pages/root";
import { Home } from "pages/home";
import { Dashboard } from "pages/dashboard";
import { FridgePage } from "pages/fridge";
import { RecipeMyPage } from "pages/recipe/myPage";
import { RecipeDetailPage } from "pages/recipe/detailPage";
import { RecipeCreationForm } from "features/recipe/create";

export const queryClient = new QueryClient();

const LoginPage = lazy(() => import("pages/login"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Navigate to={"/"} />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "recipe/:id",
        element: <RecipeDetailPage />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "",
            element: <Navigate to={"fridge"} />,
          },
          {
            path: "fridge",
            element: <FridgePage />,
          },
          {
            path: "recipe",
            element: <RecipeMyPage />,
          },
          {
            path: "recipe/create",
            element: <RecipeCreationForm />
          },
          {
            path: "*",
            element: <Navigate to={"fridge"} />,
          },
        ],
      },
    ],
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
