import { type QueryClient } from "@tanstack/react-query";
import { ActionFunctionArgs, ParamParseKey, Params } from "react-router-dom";

import { UserQueries } from "entities/user";

const Paths = {
  userDetail: "/user/:name",
} as const;

interface SearchUserLoaderArgs extends ActionFunctionArgs {
  params: Params<ParamParseKey<typeof Paths.userDetail>>;
}

export const searchUserLoader =
  (queryClient: QueryClient) =>
  async ({ params }: SearchUserLoaderArgs) => {
    try {
      const data = await queryClient.fetchQuery(
        UserQueries.userQuery(params.name as string)
      );

      return data;
    } catch (error) {
      console.log(error);
      return "error";
    }
  };
