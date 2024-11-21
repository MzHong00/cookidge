import { useSearchParams } from "react-router-dom";

export const useRecipeSortParams = () => {
  const [sortParams, setSortParams] = useSearchParams({sort: "최신순"});

  const onClickSort = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    sortParams.set("sort", e.currentTarget.innerText);
    setSortParams(sortParams);
  };

  return {
    sortParams: sortParams.get('sort'),
    onClickSort,
  };
};
