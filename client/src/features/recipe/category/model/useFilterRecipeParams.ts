import { useSearchParams } from "react-router-dom";

import { CATEGORIES_KEY } from "..";

export const useFilterRecipeParams = () => {
  const [filterParams, setFilterParams] = useSearchParams();

  const onClickSetFilterParams = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const clickedCategory = e.currentTarget.dataset.category || "";

    const curCategories = filterParams.getAll(CATEGORIES_KEY);
    const isDuplicated = curCategories.includes(clickedCategory);

    if (isDuplicated) {
      filterParams.delete(CATEGORIES_KEY);

      const newCategories = curCategories.filter(
        (category) => category !== clickedCategory
      );
      newCategories.forEach((category) => {
        filterParams.append(CATEGORIES_KEY, category);
      });
    } else {
      filterParams.append(CATEGORIES_KEY, clickedCategory);
    }

    setFilterParams(filterParams);
  };

  const onClickRemoveFilterParams = () => {
      filterParams.delete(CATEGORIES_KEY);
      setFilterParams(filterParams)
  }

  return {
    filterParams: filterParams.getAll(CATEGORIES_KEY),
    onClickSetFilterParams,
    onClickRemoveFilterParams
  };
};
