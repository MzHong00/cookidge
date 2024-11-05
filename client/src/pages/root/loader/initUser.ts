import { QueryClient } from "@tanstack/react-query";

import { UserQueries } from "entities/user";

export const initUserLoader = (queryClient: QueryClient) => async () => {
  try {
    const user = await queryClient.fetchQuery(UserQueries.meQuery())
    
    return user;
  } catch (error) {
    return "null";
  }
};
