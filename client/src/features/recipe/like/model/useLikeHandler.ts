import { useNavigate } from "react-router-dom";
import { UseMutateFunction } from "@tanstack/react-query";
import { IUser } from "shared/api/user";
import { useCallback } from "react";

interface Props {
  me?: IUser;
  likeMutate: UseMutateFunction;
  unlikeMutate: UseMutateFunction;
}

export const useLikeHandler = ({ me, likeMutate, unlikeMutate }: Props) => {
  const navigate = useNavigate();

  const onClickLike = useCallback(() => {
    if (!me) return navigate("/login");

    likeMutate();
  }, [me, likeMutate, navigate]);

  const onClickUnlike = useCallback(() => {
    if (!me) return navigate("/login");

    unlikeMutate();
  }, [me, unlikeMutate, navigate]);

  return {
    onClickLike,
    onClickUnlike,
  };
};
