import { lazy, Suspense } from "react";
import { QueryClient } from "@tanstack/react-query";
import { createBrowserRouter, Navigate } from "react-router-dom";

import { OAuthService } from "shared/api/oauth";
import { RecipeCreationForm } from "features/recipe/create";
import { CreateFridgeForm } from "features/fridge/create";
import { FridgeDetail } from "widgets/fridge";
import { Root } from "pages/root";
import { Home, searchOptionLoader } from "pages/home";
import { LoginPage } from "pages/login";
import { Dashboard } from "pages/dashboard";
import { RecipeDetailPage } from "pages/recipe";

export const queryClient = new QueryClient();

const UserPage = lazy(() =>
  import("pages/user").then((module) => ({
    default: module.UserPage,
  }))
);

const UserEditForm = lazy(() =>
  import("features/user/edit").then((module) => ({
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
        loader: searchOptionLoader(),
        element: <Home />,
      },
      {
        path: "recipe/:id",
        element: <RecipeDetailPage />,
      },
      {
        path: "user/:name",
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
        element: (
          <Suspense fallback={"...dashboard 페이지 로딩중"}>
            <Dashboard />
          </Suspense>
        ),
        children: [
          {
            path: "fridge",
            element: (
              <Suspense fallback={"...fridge 페이지 로딩중"}>
                <FridgePage />
              </Suspense>
            ),
            children: [
              {
                path: ":id",
                element: <FridgeDetail />,
              },
            ],
          },
          {
            path: "fridge/new/create",
            element: <CreateFridgeForm />,
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
            element: <Navigate to={"fridge"} />,
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
    loader: async () => await OAuthService.googleOAuthRedirect(),
    element: <Navigate to={"/"} />,
  },
]);

export default appRouter;
