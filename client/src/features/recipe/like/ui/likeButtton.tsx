import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { RiHeart3Line } from "@react-icons/all-files/ri/RiHeart3Line";
import { RiHeart3Fill } from "@react-icons/all-files/ri/RiHeart3Fill";

import { IRecipe } from "shared/api/recipe";
import { IconButton } from "shared/ui/iconButton";
import {
  useLikeMutation,
  useUnlikeMutation,
} from "../mutation/useLikeMutation";
import { UserQueries } from "entities/user";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  recipe_id: IRecipe["_id"];
  likeMembers?: IRecipe["like_members"];
}

export const LikeButton = ({
  recipe_id,
  likeMembers = [],
  disabled,
  ...props
}: Props) => {
  const navigate = useNavigate();
  const { data: me } = useQuery(UserQueries.meQuery());

  const { mutate: likeMutate } = useLikeMutation(recipe_id);
  const { mutate: unlikeMutate } = useUnlikeMutation(recipe_id);

  const isLike = me?._id && likeMembers.includes(me?._id);

  const onClickLike = () => {
    if (!me) return navigate("/login");

    likeMutate();
  };

  const onClickUnlike = () => {
    if (!me) return navigate("/login");

    unlikeMutate();
  };

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
};
