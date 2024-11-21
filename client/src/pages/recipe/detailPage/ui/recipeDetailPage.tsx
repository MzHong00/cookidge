import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { FramerFadeLayout } from "shared/ui/framerFadeLayout";
import { RecipeQueries } from "entities/recipe/queries/recipeQueries";
import { CommentBox } from "widgets/comment";
import { DetailCard } from "widgets/recipeCard";
import { RecipeStep } from "widgets/recipeStep";

import styles from "./recipeDetailPage.module.css";

export const RecipeDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery(RecipeQueries.detailQuery(id));

  if (!data || isLoading) return <div>레시피 읽는 중...</div>;

  return (
    <FramerFadeLayout className="flex-column">
      <DetailCard {...data} className={styles.recipeDetailCard} />
      <RecipeStep recipeSteps={data.cooking_steps} />
      <CommentBox recipe_id={data._id} className={styles.chatBox} />
    </FramerFadeLayout>
  );
};
