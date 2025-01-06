import { useState } from "react";

import type { IUser } from "shared/api/user";
import type { IRecipe } from "shared/api/recipe";

export const useLikeState = (
  likeMembers: IRecipe["like_members"],
  myId?: IUser["_id"]
) => {
  const [isLike, setIsLike] = useState<boolean>(
    myId ? likeMembers.includes(myId) : false
  );
  const [like, setLike] = useState<number>(likeMembers.length);

  const setLikeState = () => {
    setLike((prev) => ++prev);
    setIsLike((prev) => !prev);
  };

  const setUnlikeState = () => {
    setLike((prev) => --prev);
    setIsLike((prev) => !prev);
  };

  return { isLike, like, setLikeState, setUnlikeState };
};
