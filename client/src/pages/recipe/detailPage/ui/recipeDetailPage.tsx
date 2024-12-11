import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { RiUserReceived2Line } from "@react-icons/all-files/ri/RiUserReceived2Line";

import { FramerFadeLayout } from "shared/ui/framerFadeLayout";
import { UserCard, UserQueries } from "entities/user";
import { RecipeStep, RecipeQueries } from "entities/recipe";
import { DeleteRecipeButton } from "features/recipe/delete";
import { CommentWidget } from "widgets/comment";
import { RecipeDetailWidget } from "widgets/recipeDetail";

export const RecipeDetailPage = () => {
  const { id } = useParams();
  const { data: me } = useQuery(UserQueries.meQuery());
  const { data: recipeWithUser, isLoading } = useQuery(
    RecipeQueries.detailQuery(id)
  );

  if (isLoading) return <div>레시피 읽는 중...</div>;
  if (!recipeWithUser) return <div>레시피가 존재하지 않습니다.</div>;

  const { user, ...recipe } = recipeWithUser;

  return (
    <FramerFadeLayout className="flex-column">
      <UserCard name={user.name} picture={user.picture}>
        {me?._id === user._id ? (
          <section className="flex-row-center">
            <Link to={`/dashboard/recipe/update`} state={recipeWithUser}>
              수정
            </Link>
            <DeleteRecipeButton recipeId={recipe._id} />
          </section>
        ) : (
          <section className="flex-row-center">
            <RiUserReceived2Line />
            <span>{user.follower.length}</span>
          </section>
        )}
      </UserCard>

      <RecipeDetailWidget recipe={recipe} />

      <RecipeStep recipeSteps={recipe.cooking_steps} />

      <CommentWidget recipe_id={recipe._id}/>
    </FramerFadeLayout>
  );
};
