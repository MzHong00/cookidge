import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { RiBook2Line } from "@react-icons/all-files/ri/RiBook2Line";
import { RiHeart2Line } from "@react-icons/all-files/ri/RiHeart2Line";
import { RiAddLine } from "@react-icons/all-files/ri/RiAddLine";

import { IUser } from "shared/api/user";
import { IconLink } from "shared/ui/iconLink";
import { SubjectBox } from "shared/ui/subjectBox";
import { FramerFadeLayout } from "shared/ui/framerFadeLayout";
import { UserQueries } from "entities/user";
import { RecipeQueries } from "entities/recipe";
import { LoginForm } from "features/user/login";
import { RecipeCard } from "widgets/recipeCard";

import styles from "./recipeMyPage.module.scss";

export const RecipeMyPage = () => {
  const queryClient = useQueryClient();

  const me = queryClient.getQueryData<IUser | undefined>([UserQueries.keys.me]);
  const { data: myRecipes } = useQuery(RecipeQueries.myListQuery(me?.name));
  const { data: myLikeRecipes } = useQuery(RecipeQueries.myLikeQuery(me?.name));
  
  if (!me) return <LoginForm className={styles.loginForm} />;

  return (
    <FramerFadeLayout className="flex-column">
      <IconLink to={"create"} Icon={RiAddLine} className="main-button">
        레시피 만들기
      </IconLink>

      <div className={styles.myRecipeSection}>
        <SubjectBox
          Icon={RiBook2Line}
          title="내가 만든 레시피"
          headerClassName={styles.recipeBoxHeader}
        >
          <div className={styles.recipeContainer}>
            {myRecipes?.map((recipe) => (
              <Link to={`/recipe/${recipe._id}`} key={recipe._id}>
                <RecipeCard
                  pictures={recipe.pictures}
                  isThumbnaileMode={true}
                />
              </Link>
            ))}
          </div>
        </SubjectBox>
        <SubjectBox
          Icon={RiHeart2Line}
          title="좋아요 누른 레시피"
          headerClassName={styles.recipeBoxHeader}
        >
          <div className={styles.recipeContainer}>
            {myLikeRecipes?.map((recipe) => (
              <Link to={`/recipe/${recipe.liked_recipes._id}`} key={recipe.liked_recipes._id}>
              <RecipeCard
                pictures={recipe.liked_recipes.pictures}
                isThumbnaileMode={true}
              />
            </Link>
            ))}
          </div>
        </SubjectBox>
      </div>
    </FramerFadeLayout>
  );
};
