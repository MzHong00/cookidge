import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

import type { PagenationParams } from "shared/types";
import type { IUserInfiniteQueryParams } from "shared/api/user";
import { type IUser, UserService } from "shared/api/user";

export class UserQueries {
  static readonly keys = {
    me: "me",
    user: "user",
    infinite: "inifinite",
    rank: "rank",
    follower: "follower",
    maker: "recipe-maker",
  };

  static readonly staleTime = {
    root: 60 * 60 * 1000,
    search: 30 * 1000,
  };

  static meQuery() {
    return queryOptions({
      queryKey: [this.keys.me],
      queryFn: () => UserService.fetchMe(),
      staleTime: this.staleTime.root,
      refetchOnWindowFocus: false,
      retry: false,
    });
  }

  static userQuery(name?: IUser["name"]) {
    return queryOptions({
      queryKey: [this.keys.user, name],
      queryFn: () => UserService.fetchUser(name),
      staleTime: this.staleTime.root,
      enabled: !!name,
      retry: false,
    });
  }

  static InfiniteSearchQuery(option: Partial<IUserInfiniteQueryParams>) {
    const { user_name = "", limit = 10 } = option || {};

    return infiniteQueryOptions({
      queryKey: [this.keys.user, this.keys.infinite, user_name],
      queryFn: ({ pageParam, signal }) =>
        UserService.searchUser({
          signal,
          params: {
            user_name: user_name,
            limit: limit,
            offset: pageParam * Number(limit),
          },
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        if (lastPage.length === 0 || lastPage.length < Number(limit)) return;

        return lastPageParam + 1;
      },
      enabled: !!user_name,
      staleTime: this.staleTime.search,
      retry: false,
    });
  }

  static InfiniteFollowerRankQuery(option?: PagenationParams) {
    const { limit = 10 } = option || {};

    return infiniteQueryOptions({
      queryKey: [this.keys.rank, this.keys.follower, this.keys.infinite],
      queryFn: ({ pageParam, signal }) =>
        UserService.followerRank({
          signal,
          params: {
            limit: limit,
            offset: pageParam * limit,
          },
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        if (lastPage.length === 0 || lastPage.length < limit) return;

        return lastPageParam + 1;
      },
      staleTime: this.staleTime.root,
      retry: false,
    });
  }

  static InfiniteRecipeMakerRankQuery(option?: PagenationParams) {
    const { limit = 10 } = option || {};

    return infiniteQueryOptions({
      queryKey: [this.keys.rank, this.keys.maker, this.keys.infinite],
      queryFn: ({ pageParam, signal }) =>
        UserService.recipeMakerRank({
          signal,
          params: {
            limit: limit,
            offset: pageParam * limit,
          },
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        if (lastPage.length === 0 || lastPage.length < limit) return;

        return lastPageParam + 1;
      },
      staleTime: this.staleTime.root,
      retry: false,
    });
  }
}
