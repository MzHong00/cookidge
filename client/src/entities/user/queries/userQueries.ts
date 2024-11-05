import { queryOptions } from "@tanstack/react-query";
import { UserService } from "shared/api/user";

export class UserQueries {
  static readonly keys = {
    me: "me",
    other: "user",
  };

  static meQuery() {
    return queryOptions({
      queryKey: [this.keys.me],
      queryFn: async () => await UserService.fetchMe(),
    });
  }

  static userQuery(name: string) {
    return queryOptions({
      queryKey: [this.keys.other, name],
      queryFn: async () => await UserService.fetchUser(name),
    });
  }
}
