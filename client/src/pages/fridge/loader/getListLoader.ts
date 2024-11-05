import { QueryClient } from "@tanstack/react-query";
import { FridgeQueries } from "entities/fridge";

export const getListLoader = (queryClient: QueryClient) => async () => {
  try {
    const list = await queryClient.fetchQuery(FridgeQueries.listQuery());

    return list;
  } catch (error) {
    console.log(error);
    return [];
  }
};
