import { useQuery } from "@tanstack/react-query";
import { IoReload } from "@react-icons/all-files/io5/IoReload";
import { FaMagic } from "@react-icons/all-files/fa/FaMagic";

import { IconButton } from "shared/ui/iconButton";
import { IIngredient } from "shared/api/ingredient";
import { SubjectBox } from "shared/ui/subjectBox";
import { RecipeQueries } from "entities/recipe";
import { RecipeCard } from "widgets/recipeCard";

import styles from "./recipeRecommend.module.scss";

interface Props extends React.HTMLAttributes<HTMLElement> {
  my_ingredients?: IIngredient[];
}

export const RecipeRecommend = ({
  my_ingredients,
  className,
  ...props
}: Props) => {
  const {
    data: recipes,
    isLoading,
    refetch,
  } = useQuery(
    RecipeQueries.recommendQuery({
      my_ingredients: my_ingredients?.map((ingredient) => ingredient.name),
    })
  );

  const onClickRecommendRecipe = () => {
    if (isLoading) return;

    refetch();
  };

  return (
    <SubjectBox
      title="레시피 추천"
      subtitle="현재 냉장고 재료를 기반으로 한 추천 레시피"
      {...props}
    >
      <div className="flex-row">
        <IconButton
          Icon={IoReload}
          style={{ border: "1px solid whitesmoke" }}
          onClick={onClickRecommendRecipe}
        >
          레시피 추천
        </IconButton>
        <IconButton Icon={FaMagic} className="main-button">
          AI 추천
        </IconButton>
      </div>
      <div className={styles.recipeList}>
        {recipes?.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            className={styles.recipeCard}
            isDisabledLike
            {...recipe}
          >
            포함된 재료({recipe.matched_ingredients.length}):{" "}
            {recipe.matched_ingredients.join(", ")}
          </RecipeCard>
        ))}
      </div>
    </SubjectBox>
  );
};
