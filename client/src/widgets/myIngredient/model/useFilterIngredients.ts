import { useEffect, useState } from "react";

import type { IIngredient } from "shared/api/ingredient";

export const useFilterIngredients = (ingredients: IIngredient[]) => {
  const [filterValue, setFilterValue] = useState<string>("");
  const [filterResult, setFilterResult] = useState<IIngredient[]>(
    ingredients || []
  );

  useEffect(() => {
    if (!ingredients || ingredients.length === 0) return;

    const timer = setTimeout(() => {
      const filteredIngredients = ingredients.filter((ingredient) =>
        ingredient.name.includes(filterValue)
      );
      setFilterResult(filteredIngredients);
    }, 500);

    return () => clearTimeout(timer);
  }, [filterValue, ingredients]);

  const onChangeFilterValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value);
  };

  return {
    filterValue,
    filterResult,
    onChangeFilterValue,
  };
};
