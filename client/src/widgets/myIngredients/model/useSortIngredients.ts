import { useMemo, useState } from "react";

import type { IIngredient } from "shared/api/ingredient";
import { INGREDIENT_SORT_TYPES } from "entities/ingredient";

export const useSortIngredients = (ingredients: IIngredient[]) => {
  const [sortTypeValue, setSortTypeValue] = useState<
    (typeof INGREDIENT_SORT_TYPES)[number]
  >(INGREDIENT_SORT_TYPES[0]);

  const sortResult = useMemo(() => {
    if (sortTypeValue === INGREDIENT_SORT_TYPES[0]) {
      return ingredients.sort((a, b) => b.category.localeCompare(a.category));
    }

    return ingredients.sort((a, b) => b.expired_at.localeCompare(a.expired_at));
  }, [ingredients, sortTypeValue]);

  const onChangesortTypeValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortTypeValue(e.target.value as (typeof INGREDIENT_SORT_TYPES)[number]);
  };

  return {
    sortTypeValue,
    sortResult,
    onChangesortTypeValue,
  };
};
