import { SearchBox } from "shared/ui/searchBox";
import { useParamsDebounce } from "shared/hooks/useParamsDebounce";
import { RecipeSearchList } from "entities/recipe";

export const RecipeSearchWidget = () => {
  const { value, onChangeRecipeSearch } = useParamsDebounce();

  return (
    <div className="flex-column">
      <SearchBox
        value={value}
        placeholder="요리 제목을 입력하세요"
        style={{ padding: "1em" }}
        onChange={onChangeRecipeSearch}
      />
      <RecipeSearchList />
    </div>
  );
};
