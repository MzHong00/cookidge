import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

import { IUser, UserService } from "shared/api/user";
import { IUserInfiniteQueryParams } from "shared/api/user/type";
import { useGlobalStore } from "shared/lib/zustand/useStore";

export class UserQueries {
  static readonly keys = {
    me: "me",
    user: "user",
    infinite: "inifinite",
  };

  static readonly staleTime = 60 * 60 * 1000;

  static meQuery() {
    const { isLogin } = useGlobalStore.getState();

    return queryOptions({
      queryKey: [this.keys.me],
      queryFn: async () => await UserService.fetchMe(),
      staleTime: this.staleTime,
      enabled: isLogin,
      retry: false,
    });
  }

  static userQuery(name?: IUser["name"]) {
    return queryOptions({
      queryKey: [this.keys.user, name],
      queryFn: async () => await UserService.fetchUser(name),
      staleTime: this.staleTime,
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
      getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
        if (lastPage?.length === 0) return;

        return lastPageParam + 1;
      },
      enabled: !!user_name,
      retry: false,
    });
  }
}
