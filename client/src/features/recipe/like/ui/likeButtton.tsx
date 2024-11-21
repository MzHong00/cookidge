import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { RiHeart3Line } from "@react-icons/all-files/ri/RiHeart3Line";
import { RiHeart3Fill } from "@react-icons/all-files/ri/RiHeart3Fill";

import { IUser } from "shared/api/user";
import { IRecipe } from "shared/api/recipe";
import { IconButton } from "shared/ui/iconButton";
import {
  useLikeMutation,
  useUnlikeMutation,
} from "../mutation/useLikeMutation";
import { UserQueries } from "entities/user";
import { useLikeState } from "../model/useLikeState";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  recipe_id: IRecipe["_id"];
  likeMembers: IRecipe["like_members"];
}

export const LikeButton = ({ recipe_id, likeMembers, ...props }: Props) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const me = queryClient.getQueryData<IUser | undefined>([UserQueries.keys.me]);
  const { mutate: likeMutate } = useLikeMutation(recipe_id);
  const { mutate: unlikeMutate } = useUnlikeMutation(recipe_id);

  const { isLike, like, setLikeState, setUnlikeState } = useLikeState(
    likeMembers,
    me?._id
  );

  const onClickLike = () => {
    if (!me) return navigate("/login");

    setLikeState();
    likeMutate();
  };

  const onClickUnlike = () => {
    if (!me) return navigate("/login");
    
    setUnlikeState();
    unlikeMutate();
  };

  if (isLike)
    return (
      <IconButton
        Icon={() => <RiHeart3Fill color="red" />}
        onClick={onClickUnlike}
        {...props}
      >
        {like}
      </IconButton>
    );

  return (
    <IconButton
      Icon={() => <RiHeart3Line color="red" />}
      onClick={onClickLike}
      {...props}
    >
      {like}
    </IconButton>
  );
};
