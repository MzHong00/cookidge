import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";

import { UserQueries } from "entities/user";
import { IUser, UserService } from "shared/api/user";

export const useFollowMutation = (
  followUserId: IUser["_id"],
  followUserName: IUser["name"]
) => {
  const queryClient = useQueryClient();
  const userQueryKey: QueryKey = [UserQueries.keys.user, followUserName];

  return useMutation({
    mutationFn: () => UserService.followUser(followUserId),
    onMutate: async () => {
      const me = queryClient.getQueryData([UserQueries.keys.me]) as IUser;

      await queryClient.cancelQueries({ queryKey: userQueryKey });

      const prevUserState = queryClient.getQueryData(userQueryKey) as IUser;

      if(prevUserState){
        queryClient.setQueryData(userQueryKey, (old: IUser) => ({
          ...old,
          follower: [...old.follower, me._id],
        }));
      }
      

      return { prevUserState };
    },
    onError: (err, variable, context) => {
      queryClient.setQueryData(userQueryKey, context?.prevUserState);
    },
  });
};

export const useUnfollowMutation = (
  unfollowUserId: IUser["_id"],
  unfollowUserName: IUser["name"]
) => {
  const queryClient = useQueryClient();
  const userQueryKey: QueryKey = [UserQueries.keys.user, unfollowUserName];

  return useMutation({
    mutationFn: () => UserService.unfollowUser(unfollowUserId),
    onMutate: async () => {
      const me = queryClient.getQueryData([UserQueries.keys.me]) as IUser;

      await queryClient.cancelQueries({ queryKey: userQueryKey });

      const prevUserState = queryClient.getQueryData(userQueryKey) as IUser;

      if (prevUserState) {
        // User 페이지 부분 반영
        queryClient.setQueryData(userQueryKey, (old: IUser) => ({
          ...old,
          follower: old.follower.filter((user) => user !== me._id),
        }));
      }

      return { prevUserState };
    },
    onError: (err, variable, context) => {
      queryClient.setQueryData(userQueryKey, context?.prevUserState);
    },
    onSettled: ()=> {
      queryClient.invalidateQueries({queryKey: userQueryKey})
    }
  });
};
