import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import { OAuthService } from "shared/api/oauth";
import { CreateFridgeForm } from "features/fridge/create";
import { Root } from "pages/root";
import { RankOverViewPage } from "pages/rank/rankOverView";
import { LoginPage } from "pages/login";
import { Dashboard } from "pages/dashboard";
import { Home, searchOptionLoader } from "pages/home";
import { RecipeDetailPage } from "pages/recipe/detailPage";
import { FridgeDetailPage } from "pages/fridge/detailPage";
import { UserSearchBox } from "entities/user";
import { LoadingSpinner } from "shared/ui/loadingSpinner";
import { RecipeSearchList } from "entities/recipe";
const SearchPage = lazy(() => import("pages/search"));
const RecipeMyPage = lazy(() => import("pages/recipe/myPage"));
const UserPage = lazy(() => import("pages/user/userDetailPage"));
const FridgeMyListPage = lazy(() => import("pages/fridge/myListPage"));
const UserSettingPage = lazy(() => import("pages/user/userSettingPage"));
const FridgeSettingPage = lazy(() => import("pages/fridge/settingPage"));
const RecipeCreatePage = lazy(() => import("pages/recipe/createPage"));
const RecipeUpdatePage = lazy(() => import("pages/recipe/updatePage"));
const LikeRankPage = lazy(() => import("pages/rank/likeRank"));
const MakerRankPage = lazy(() => import("pages/rank/makerRank"));
const FollowerRankPage = lazy(() => import("pages/rank/followerRank"));

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
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <SearchPage />
          </Suspense>
        ),
        children: [
          {
            index: true, // 기본 경로 설정
            element: <Navigate to="user" replace />,
          },
          {
            path: "recipe",
            element: <RecipeSearchList />,
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
          <Suspense fallback={<LoadingSpinner />}>
            <UserPage />
          </Suspense>
        ),
      },
      {
        path: "setting",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <UserSettingPage />
          </Suspense>
        ),
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            index: true,
            element: <Navigate to={"fridge"} replace />,
          },
          {
            path: "fridge",
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <FridgeMyListPage />
              </Suspense>
            ),
            children: [
              {
                path: "detail/:id",
                element: <FridgeDetailPage />,
              },
              {
                path: "setting/:id",
                element: (
                  <Suspense fallback={"...냉장고 설정 페이지 로딩중"}>
                    <FridgeSettingPage />
                  </Suspense>
                ),
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
            element: (
              <Suspense fallback={"...레시피 생성 페이지 로딩중"}>
                <RecipeCreatePage />
              </Suspense>
            ),
          },
          {
            path: "recipe/update",
            element: (
              <Suspense fallback={"...레시피 수정 페이지 로딩중"}>
                <RecipeUpdatePage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "rank",
        element: <RankOverViewPage />,
      },
      {
        path: "rank/recipe-like",
        element: (
          <Suspense fallback={"...레시피 수정 페이지 로딩중"}>
            <LikeRankPage />
          </Suspense>
        ),
      },
      {
        path: "rank/recipe-maker",
        element: (
          <Suspense fallback={"...레시피 수정 페이지 로딩중"}>
            <MakerRankPage />
          </Suspense>
        ),
      },
      {
        path: "rank/follower",
        element: (
          <Suspense fallback={"...레시피 수정 페이지 로딩중"}>
            <FollowerRankPage />
          </Suspense>
        ),
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
