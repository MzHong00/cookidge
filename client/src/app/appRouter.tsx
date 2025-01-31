import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import { OAuthService } from "shared/api/oauth";
import { LoadingSpinner } from "shared/ui/loadingSpinner";
import { UserSearchBox } from "entities/user";
import { RecipeSearchBox } from "entities/recipe";
import { CreateFridgeForm } from "features/fridge/create";
import { Root } from "pages/root";
import { Home } from "pages/home";
import { LoginPage } from "pages/login";
import { Dashboard } from "pages/dashboard";
import { NotFound } from "widgets/notFound";
import { RecipeDetailPage } from "pages/recipe/detailPage";
import {
  FridgeDetailPage,
  FridgeDetailPageSkeleton,
} from "pages/fridge/detailPage";
import { RankOverViewPage } from "pages/rank/rankOverView";
import { QueryWrapper } from "shared/ui/queryWrapper";
const SearchPage = lazy(() => import("pages/search"));
const UserPage = lazy(() => import("pages/user/userDetailPage"));
const UserSettingPage = lazy(() => import("pages/user/userSettingPage"));
const FridgeMyListPage = lazy(() => import("pages/fridge/myListPage"));
const FridgeSettingPage = lazy(() => import("pages/fridge/settingPage"));
const RecipeMyPage = lazy(() => import("pages/recipe/myPage"));
const RecipeCreatePage = lazy(() => import("pages/recipe/createPage"));
const RecipeUpdatePage = lazy(() => import("pages/recipe/updatePage"));
const LikeRankPage = lazy(() => import("pages/rank/likeRank"));
const MakerRankPage = lazy(() => import("pages/rank/makerRank"));
const FollowerRankPage = lazy(() => import("pages/rank/followerRank"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
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
        path: "search",
        element: (
          <Suspense fallback={<LoadingSpinner msg="검색 페이지 로딩중..." />}>
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
          <Suspense fallback={<LoadingSpinner msg="사용자 페이지 로딩중..." />}>
            <UserPage />
          </Suspense>
        ),
      },
      {
        path: "setting",
        element: (
          <Suspense
            fallback={<LoadingSpinner msg="사용자 설정 페이지 로딩중..." />}
          >
            <UserSettingPage />
          </Suspense>
        ),
      },
      {
        path: "dashboard",
        element: (
          <QueryWrapper
            supenseFallback={<LoadingSpinner msg="사용자 가져오는 중..." />}
          >
            <Dashboard />
          </QueryWrapper>
        ),
        children: [
          {
            index: true,
            element: <Navigate to={"fridge"} replace />,
          },
          {
            path: "fridge",
            element: (
              <Suspense
                fallback={<LoadingSpinner msg="냉장고 목록 가져오는 중..." />}
              >
                <FridgeMyListPage />
              </Suspense>
            ),
            children: [
              {
                path: "detail/:id",
                element: (
                  <QueryWrapper supenseFallback={<FridgeDetailPageSkeleton />}>
                    <FridgeDetailPage />
                  </QueryWrapper>
                ),
              },
              {
                path: "setting/:id",
                element: (
                  <QueryWrapper
                    supenseFallback={
                      <LoadingSpinner msg="냉장고 설정 페이지 로딩중..." />
                    }
                  >
                    <FridgeSettingPage />
                  </QueryWrapper>
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
              <Suspense
                fallback={<LoadingSpinner msg="나의 레시피 페이지 로딩중..." />}
              >
                <RecipeMyPage />
              </Suspense>
            ),
          },
          {
            path: "recipe/create",
            element: (
              <Suspense
                fallback={<LoadingSpinner msg="레시피 생성 페이지 로딩중..." />}
              >
                <RecipeCreatePage />
              </Suspense>
            ),
          },
          {
            path: "recipe/update",
            element: (
              <Suspense
                fallback={<LoadingSpinner msg="레시피 수정 페이지 로딩중..." />}
              >
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
          <Suspense
            fallback={
              <LoadingSpinner msg="레시피 좋아요 랭킹 페이지 로딩중..." />
            }
          >
            <LikeRankPage />
          </Suspense>
        ),
      },
      {
        path: "rank/recipe-maker",
        element: (
          <Suspense
            fallback={
              <LoadingSpinner msg="레시피 메이커 랭킹 페이지 로딩중..." />
            }
          >
            <MakerRankPage />
          </Suspense>
        ),
      },
      {
        path: "rank/follower",
        element: (
          <Suspense
            fallback={<LoadingSpinner msg="팔로우 랭킹 페이지 로딩중..." />}
          >
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
    loader: async () => await OAuthService.loginWithGoogleOAuth(),
    element: <Navigate to={"/dashboard"} />,
  },
]);

export default appRouter;
