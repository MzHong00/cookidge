import { HTMLAttributes, useMemo } from "react";
import { RiUserAddLine } from "@react-icons/all-files/ri/RiUserAddLine";
import { RiUserFollowLine } from "@react-icons/all-files/ri/RiUserFollowLine";

import { IUser } from "shared/api/user";
import { IconButton } from "shared/ui/iconButton";
import {
  useFollowMutation,
  useUnfollowMutation,
} from "../mutation/followMutation";

import styles from "./followButton.module.scss";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  meId?: IUser["_id"];
  user: IUser;
}

export const FollowButton = ({ meId, user, className, ...props }: Props) => {
  const { mutate: mutateFollow } = useFollowMutation(user._id, user.name);
  const { mutate: mutateUnfollow } = useUnfollowMutation(user._id, user.name);
  
  const isFollow = useMemo(
    () => user.follower.includes(meId||""),
    [meId, user.follower]
  );

  if (!meId) return null;

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
