import { Link } from "react-router-dom";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { RiTimer2Line } from "@react-icons/all-files/ri/RiTimer2Line";
import { RiGroupLine } from "@react-icons/all-files/ri/RiGroupLine";
import { RiCalendarLine } from "@react-icons/all-files/ri/RiCalendarLine";
import { RiUserReceived2Line } from "@react-icons/all-files/ri/RiUserReceived2Line";

import type { IRecipe } from "shared/api/recipe/type";
import { IconBox } from "shared/ui/iconBox";
import { PicturesBox } from "shared/ui/picturesBox";
import { UserCard, UserQueries } from "entities/user";
import { RecipeQueries, RecipeStep } from "entities/recipe";
import { INGREDIENTS_CATEGORIES } from "entities/ingredient";
import { LikeButton } from "features/recipe/like";
import { DeleteRecipeButton } from "features/recipe/delete";

import styles from "./recipeDetailWidget.module.scss";

export const RecipeDetailWidget = ({
  recipe_id,
}: {
  recipe_id: IRecipe["_id"];
}) => {
  const { data: me } = useQuery(UserQueries.meQuery());
  const { data: recipeWithUser } = useSuspenseQuery(
    RecipeQueries.detailQuery(recipe_id)
  );

  const { user, ...recipe } = recipeWithUser;
  const {
    _id,
    name,
    pictures,
    ingredients,
    introduction,
    servings,
    cooking_time,
    created_at,
    like_members,
  } = recipe;

  return (
    <article className={styles.container}>
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

      <PicturesBox pictures={pictures} className={styles.pictures} />

      <div className={styles.contents}>
        <div className={styles.info}>
          <h4 className={styles.title}>{name}</h4>
          <LikeButton recipe_id={_id} likeMembers={like_members} />
          <div className={styles.subInfo}>
            <IconBox Icon={RiTimer2Line}>조리시간 {cooking_time}분</IconBox>
            <IconBox Icon={RiGroupLine}>{servings}인분</IconBox>
            <IconBox Icon={RiCalendarLine}>
              {`${created_at.toString().substring(0, 10)}`}
            </IconBox>
          </div>
          <p>{introduction}</p>
        </div>

        <ul className={styles.ingredients}>
          {ingredients.map((ingredient) => (
            <li key={ingredient.name} className={styles.ingredient}>
              {
                INGREDIENTS_CATEGORIES.find(
                  (cate) => cate.text === ingredient.category
                )?.emoji
              }
              {ingredient.name} {ingredient.quantity}
            </li>
          ))}
        </ul>
      </div>

      {!!recipe.cooking_steps.length && (
        <RecipeStep recipeSteps={recipe.cooking_steps} />
      )}
    </article>
  );
};
