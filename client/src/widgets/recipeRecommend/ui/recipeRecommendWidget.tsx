import { useQuery } from "@tanstack/react-query";
import { IoReload } from "@react-icons/all-files/io5/IoReload";
import { FaMagic } from "@react-icons/all-files/fa/FaMagic";

import { type IFridge } from "shared/api/fridge";
import { IconButton } from "shared/ui/iconButton";
import { type IIngredient } from "shared/api/ingredient";
import { SubjectBox } from "shared/ui/subjectBox";
import { RecipeCard, RecipeQueries } from "entities/recipe";
import { LikeButton } from "features/recipe/like";

import styles from "./recipeRecommendWidget.module.scss";

interface Props extends React.HTMLAttributes<HTMLElement> {
  fridge_id: IFridge["_id"];
  my_ingredients?: IIngredient[];
}

export const RecipeRecommendWidget = ({
  fridge_id,
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
      fridge_id: fridge_id,
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
        {recipes?.map(({ matched_ingredients, ...recipe }) => (
          <RecipeCard
            key={recipe._id}
            className={styles.recipeCard}
            recipe={recipe}
          >
            <div>
              <LikeButton
                recipe_id={recipe._id}
                likeMembers={recipe.like_members}
                disabled
              />
              <div>
                포함된 재료({matched_ingredients.length}):{" "}
                {matched_ingredients.join(", ")}
              </div>
            </div>
          </RecipeCard>
        ))}
      </div>
    </SubjectBox>
  );
};
