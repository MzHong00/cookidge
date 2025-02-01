import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { IoReload } from "@react-icons/all-files/io5/IoReload";

import type { IFridge } from "shared/api/fridge";
import type { IIngredient } from "shared/api/ingredient";
import { useAlertActions } from "shared/ui/alert";
import { IconButton } from "shared/ui/iconButton";
import { SubjectBox } from "shared/ui/subjectBox";
import { RecipeCard, RecipeCardSkeleton, RecipeQueries } from "entities/recipe";
import { LikeButton } from "features/recipe/like";

import styles from "./recipeRecommendWidget.module.scss";

interface Props extends React.HTMLAttributes<HTMLElement> {
  fridge_id: IFridge["_id"];
  my_ingredients?: IIngredient[];
}
const SKELETON_COUNT = 4;

export const RecipeRecommendWidget = ({
  fridge_id,
  my_ingredients,
  className,
  ...props
}: Props) => {
  const { alertEnqueue } = useAlertActions();
  const {
    data: recipes,
    isFetching,
    refetch,
  } = useQuery(
    RecipeQueries.recommendQuery({
      fridge_id: fridge_id,
      my_ingredients: my_ingredients?.map((ingredient) => ingredient.name),
    })
  );

  const onClickRecommendRecipe = () => {
    if (my_ingredients?.length === 0) {
      alertEnqueue({
        message: "재료 등록 후 사용해 주세요.",
        type: "error",
      });
    }
    refetch();
  };

  return (
    <SubjectBox
      title="레시피 추천"
      subtitle="현재 냉장고 재료를 기반으로 한 추천 레시피"
      {...props}
    >
      <IconButton
        Icon={IoReload}
        className={styles.recommendButton}
        onClick={onClickRecommendRecipe}
        disabled={isFetching}
      >
        레시피 추천
      </IconButton>
      <div className={styles.recipeList}>
        {isFetching ? (
          <RecipeCardSkeleton count={SKELETON_COUNT} />
        ) : (
          recipes?.map(({ matched_ingredients, ...recipe }) => (
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
              className={styles.recipeCard}
            >
              <Link to={`/recipe/${recipe._id}`}>
                <LikeButton
                  recipe_id={recipe._id}
                  likeMembers={recipe.like_members}
                  disabled
                />
                <div>
                  포함된 재료({matched_ingredients.length}):{" "}
                  {matched_ingredients.join(", ")}
                </div>
              </Link>
            </RecipeCard>
          ))
        )}
      </div>
    </SubjectBox>
  );
};
