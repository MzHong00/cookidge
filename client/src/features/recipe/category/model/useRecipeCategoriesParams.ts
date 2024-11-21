import { useSearchParams } from "react-router-dom";

export const useRecipeCategoriesParams = () => {
  const [categoriesParams, setSortParams] = useSearchParams();

  const onClickCategories = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const category = e.currentTarget.dataset.category || "";

    if(categoriesParams.get('categories') === category) {
      categoriesParams.delete('categories')
    } else{
      categoriesParams.set("categories", category);
    }

    setSortParams(categoriesParams);
  };

  return {
    categoriesParams: categoriesParams.get('categories'),
    onClickCategories,
  };
};
