import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";

import { RecipeCreationForm } from "features/recipe";
import { Root, initUserLoader } from "pages/root";
import { Home } from "pages/home";
import { LoginPage } from "pages/login";
import { Dashboard } from "pages/dashboard";
import { RecipeDetailPage } from "pages/recipe";
import { searchUserLoader } from "pages/user/loader/searchUserLoader";
import { googleOAuthRedirect } from "features/user";

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
    loader: initUserLoader(queryClient),
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
        path: "user/:name",
        loader: searchUserLoader(queryClient),
        element: (
          <Suspense fallback={"...사용자 페이지 로딩 중"}>
            <UserPage />
          </Suspense>
        ),
      },
      {
        path: "setting",
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
              <Suspense fallback={"...fridge 페이지 로딩중"}>
                <FridgePage />
              </Suspense>
            ),
          },
          {
            path: "recipe",
            element: (
              <Suspense fallback={"...myRecipe 페이지 로딩중"}>
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
  {
    path: "/oauth-redirect",
    loader: async () => await googleOAuthRedirect(),
    element: <Navigate to={"/"} />,
  },
]);

export default appRouter;
