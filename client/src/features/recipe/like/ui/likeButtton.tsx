import { memo, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { RiHeart3Line } from "@react-icons/all-files/ri/RiHeart3Line";
import { RiHeart3Fill } from "@react-icons/all-files/ri/RiHeart3Fill";

import type { IRecipe } from "shared/api/recipe";
import { IconButton } from "shared/ui/iconButton";
import { UserQueries } from "entities/user";
import {
  useLikeMutation,
  useUnlikeMutation,
} from "../mutation/useLikeMutation";
import { useLikeHandler } from "../model/useLikeHandler";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  recipe_id: IRecipe["_id"];
  likeMembers?: IRecipe["like_members"];
}

export const LikeButton = memo(
  ({ recipe_id, likeMembers = [], disabled, ...props }: Props) => {
    const { data: me } = useQuery(UserQueries.meQuery());

    const { mutate: likeMutate } = useLikeMutation(recipe_id);
    const { mutate: unlikeMutate } = useUnlikeMutation(recipe_id);

    const { onClickLike, onClickUnlike } = useLikeHandler({
      me,
      likeMutate,
      unlikeMutate,
    });
    const isLike = useMemo(
      () => me?._id && likeMembers.includes(me?._id),
      [me?._id, likeMembers]
    );

    return (
      <IconButton
        Icon={() =>
          isLike ? <RiHeart3Fill color="red" /> : <RiHeart3Line color="red" />
        }
        onClick={isLike ? onClickUnlike : onClickLike}
        style={{
          paddingInline: 0.25,
          ...(disabled && { pointerEvents: "none" }),
        }}
        disabled={disabled}
        {...props}
      >
        {likeMembers.length}
      </IconButton>
    );
  }
);
