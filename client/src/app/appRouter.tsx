import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";

import { RecipeCreationForm } from "features/recipe";
import Root from "pages/root";
import { Home } from "pages/home";
import LoginPage from "pages/login";
import { Dashboard } from "pages/dashboard";
import { RecipeDetailPage} from "pages/recipe";

export const queryClient = new QueryClient();

const UserPage = lazy(() =>
  import("pages/user").then((module) => ({
    default: module.UserPage,
  }))
);

const UserEditForm = lazy(() =>
  import("features/user").then((module) => ({
    default: module.UserEditForm,
  }))
);

const FridgePage = lazy(() =>
  import("pages/fridge/index").then((module) => ({
    default: module.FridgePage,
  }))
);

const RecipeMyPage = lazy(() =>
  import("pages/recipe/index").then((module) => ({
    default: module.RecipeMyPage,
  }))
);

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
        path: "/user",
        element: (
          <Suspense fallback={"...사용자 페이지 로딩 중"}>
            <UserPage />
          </Suspense>
        ),
      },
      {
        path: "/user/setting",
        element: (
          <Suspense fallback={"...사용자 편집 폼 로딩 중"}>
            <UserEditForm />
          </Suspense>
        ),
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "",
            element: <Navigate to={"fridge/1"} />,
          },
          {
            path: "fridge/:id",
            element: (
              <Suspense fallback={'...fridge 페이지 로딩중'}>
                <FridgePage />
              </Suspense>
            ),
          },
          {
            path: "recipe",
            element: (
              <Suspense  fallback={'...myRecipe 페이지 로딩중'}>
                <RecipeMyPage />
              </Suspense>
            ),
          },
          {
            path: "recipe/create",
            element: <RecipeCreationForm />,
          },
          {
            path: "*",
            element: <Navigate to={"fridge/1"} />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default appRouter;
