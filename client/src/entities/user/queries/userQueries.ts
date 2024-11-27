import { queryOptions } from "@tanstack/react-query";

import { UserService } from "shared/api/user";
import { useGlobalStore } from "shared/lib/zustand/useStore";

export class UserQueries {
  static readonly keys = {
    me: "me",
    user: "user",
  };

  static readonly staleTime = 60 * 60 * 1000;

  static meQuery() {
    const {isLogin} = useGlobalStore.getState();

    return queryOptions({
      queryKey: [this.keys.me],
      queryFn: async () => await UserService.fetchMe(),
      staleTime: this.staleTime,
      enabled: isLogin,
      retry: false
    });
  }

  static userQuery(name?: string) {
    return queryOptions({
      queryKey: [this.keys.user, name],
      queryFn: async () => await UserService.fetchUser(name),
      staleTime: this.staleTime,
      enabled: !!name,
      retry: false
    });
  }
}
