import { useSearchParams } from "react-router-dom";
import { RecipeFilterQuery } from "shared/api/recipe";

export const useRecipeSearchParams = () => {
  const [params] = useSearchParams();

  return {
    sort: params.get("sort"),
    categories: params.getAll("categories"),
  } as RecipeFilterQuery;
};
