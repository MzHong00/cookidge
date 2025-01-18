import { useSearchParams } from "react-router-dom";

import { SORT } from "../consts/consts";

export const useRecipeSortParams = () => {
  const [sortParams, setSortParams] = useSearchParams({ sort: SORT["최신순"] });

  const onClickSetSortParams = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    sortParams.set("sort", e.currentTarget.value);
    setSortParams(sortParams);
  };

  return {
    sortParams: sortParams.get("sort"),
    onClickSetSortParams,
  };
};
