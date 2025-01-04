import { useSearchParams } from "react-router-dom";

import { CATEGORIES_KEY } from "..";

export const useRecipeCategoriesParams = () => {
  const [categoriesParams, setSortParams] = useSearchParams();

  const onClickCategories = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const clickedCategory = e.currentTarget.dataset.category || "";

    const curCategories = categoriesParams.getAll(CATEGORIES_KEY);
    const isDuplicated = curCategories.includes(clickedCategory);

    if (isDuplicated) {
      categoriesParams.delete(CATEGORIES_KEY);

      const newCategories = curCategories.filter(
        (category) => category !== clickedCategory
      );
      newCategories.forEach((category) => {
        categoriesParams.append(CATEGORIES_KEY, category);
      });
    } else {
      categoriesParams.append(CATEGORIES_KEY, clickedCategory);
    }

    setSortParams(categoriesParams);
  };

  return {
    categoriesParams: categoriesParams.getAll(CATEGORIES_KEY),
    onClickCategories,
  };
};
