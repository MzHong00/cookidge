import { QueryClient } from "@tanstack/react-query";

import { issueAccessToken } from "shared/api/jwtToken";
import { useGlobalStore } from "shared/lib/zustand/useStore";
import { fetchMe } from "entities/user";

export const initUserLoader = (queryClient: QueryClient) => async () => {
  try {
    const { setUser } = useGlobalStore.getState();

    await issueAccessToken();
    const user = await fetchMe();

    queryClient.setQueryData(["user", user.name], user);
    setUser(user);

    return user;
  } catch (error) {
    return "null";
  }
};
