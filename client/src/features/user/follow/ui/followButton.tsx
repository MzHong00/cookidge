import { HTMLAttributes, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { RiUserAddLine } from "@react-icons/all-files/ri/RiUserAddLine";
import { RiUserFollowLine } from "@react-icons/all-files/ri/RiUserFollowLine";

import { IUser } from "shared/api/user";
import { IconButton } from "shared/ui/iconButton";
import { UserQueries } from "entities/user";
import {
  useFollowMutation,
  useUnfollowMutation,
} from "../mutation/followMutation";

import styles from "./followButton.module.css";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  user: IUser;
}

export const FollowButton = ({ user, className, ...props }: Props) => {
  const me = useQueryClient().getQueryData([UserQueries.keys.me]) as IUser | undefined;
  const { mutate: mutateFollow } = useFollowMutation(user._id, user.name);
  const { mutate: mutateUnfollow } = useUnfollowMutation(user._id, user.name);

  const isFollow = useMemo(
    () => user.follower.includes(me?._id||""),
    [me?._id, user.follower]
  );

  if(!me) return null;

  if (isFollow)
    return (
      <IconButton
        Icon={RiUserFollowLine}
        onClick={() => {
          mutateUnfollow();
        }}
        className={`${styles.followButton} ${className}`}
        {...props}
      >
        팔로우 해제
      </IconButton>
    );

  return (
    <IconButton
      Icon={RiUserAddLine}
      onClick={() => {
        mutateFollow();
      }}
      className={`${styles.followButton} ${className}`}
      {...props}
    >
      팔로우
    </IconButton>
  );
};
