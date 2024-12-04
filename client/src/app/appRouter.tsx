import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import { OAuthService } from "shared/api/oauth";
import { CreateFridgeForm } from "features/fridge/create";
import { RecipeSearchBox } from "widgets/recipeSearch";
import { UserSearchBox } from "widgets/userSearch";
import { Root } from "pages/root";
import { LoginPage } from "pages/login";
import { SearchPage } from "pages/search";
import { Dashboard } from "pages/dashboard";
import { Home, searchOptionLoader } from "pages/home";
import { RecipeDetailPage } from "pages/recipe/detailPage";
import { RecipeCreatePage } from "pages/recipe/createPage";
import { RecipeUpdatePage } from "pages/recipe/updatePage";
import { UserSettingPage } from "pages/user/userSettingPage";
import { FridgeDetailPage } from "pages/fridge/detailPage";
import { FridgeSettingPage } from "pages/fridge/settingPage";

const UserPage = lazy(() =>
  import("pages/user/userDetailPage").then((module) => ({
    default: module.UserPage,
  }))
);

const FridgeMyListPage = lazy(() =>
  import("pages/fridge/myListPage").then((module) => ({
    default: module.FridgeMyListPage,
  }))
);

const RecipeMyPage = lazy(() =>
  import("pages/recipe/myPage").then((module) => ({
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
        path: "search",
        element: <SearchPage />,
        children: [
          {
            index: true, // 기본 경로 설정
            element: <Navigate to="user" replace />,
          },
          {
            path: "recipe",
            element: <RecipeSearchBox />,
          },
          {
            path: "user",
            element: <UserSearchBox />,
          },
        ],
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
            <UserSettingPage />
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
            index: true,
            element: <Navigate to={"fridge"} replace />,
          },
          {
            path: "fridge",
            element: (
              <Suspense fallback={"...fridge 페이지 로딩중"}>
                <FridgeMyListPage />
              </Suspense>
            ),
            children: [
              {
                path: "detail/:id",
                element: <FridgeDetailPage />,
              },
              {
                path: 'setting/:id',
                element: <FridgeSettingPage />
              }
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
            element: <RecipeCreatePage />,
          },
          {
            path: "recipe/update",
            element: <RecipeUpdatePage />,
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
