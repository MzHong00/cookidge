import { type QueryClient } from "@tanstack/react-query";
import { fetchUser } from "entities/user";
import { ActionFunctionArgs, ParamParseKey, Params } from "react-router-dom";

const Paths = {
  todoDetail: "/user/:name",
} as const;

interface SearchUserLoaderArgs extends ActionFunctionArgs {
  params: Params<ParamParseKey<typeof Paths.todoDetail>>;
}

export const searchUserLoader =
  (queryClient: QueryClient) =>
  async ({ params }: SearchUserLoaderArgs) => {
    try {
      const data = await queryClient.fetchQuery({
        queryKey: ["user", params.name],
        queryFn: () => fetchUser(params.name as string),
        staleTime: 10000,
      });

      return data;
    } catch (error) {
      console.log(error);
      return "error";
    }
  };
