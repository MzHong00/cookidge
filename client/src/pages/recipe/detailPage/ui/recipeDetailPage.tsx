import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import { IUser } from "shared/api/user";
import { FramerFadeLayout } from "shared/ui/framerFadeLayout";
import { RecipeQueries } from "entities/recipe/queries/recipeQueries";
import { UserQueries } from "entities/user";
import { FollowButton } from "features/user/follow";
import { DeleteRecipeButton } from "features/recipe/delete";
import { UserCard } from "shared/ui/userCard";
import { CommentBox } from "widgets/comment";
import { DetailCard } from "widgets/recipeCard";
import { RecipeStep } from "widgets/recipeStep";

import styles from "./recipeDetailPage.module.scss";

export const RecipeDetailPage = () => {
  const { id } = useParams();
  const { data: recipe, isLoading } = useQuery(RecipeQueries.detailQuery(id));

  const me = useQueryClient().getQueryData([UserQueries.keys.me]) as
    | IUser
    | undefined;

  if (isLoading) return <div>레시피 읽는 중...</div>;
  if (!recipe) return <div>레시피가 존재하지 않습니다.</div>;

  return (
    <FramerFadeLayout className={styles.container}>
      <UserCard name={recipe.user.name} picture={recipe.user.picture}>
        {me?._id === recipe.user._id ? (
          <section className="flex-row-center">
            <Link to={`/dashboard/recipe/update`} state={recipe}>
              수정
            </Link>
            <DeleteRecipeButton recipeId={recipe._id} />
          </section>
        ) : (
          <FollowButton
            meId={me?._id}
            user={recipe.user}
            className={styles.followButton}
          />
        )}
      </UserCard>
      <DetailCard {...recipe} className={styles.recipeDetailCard} />
      <RecipeStep recipeSteps={recipe.cooking_steps} />
      <CommentBox recipe_id={recipe._id} className={styles.chatBox} />
    </FramerFadeLayout>
  );
};
