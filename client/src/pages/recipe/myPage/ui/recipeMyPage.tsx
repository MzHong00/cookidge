import { useQuery, useQueryClient } from "@tanstack/react-query";
import { RiAddLine } from "@react-icons/all-files/ri/RiAddLine";
import { RiBook2Line } from "@react-icons/all-files/ri/RiBook2Line";
import { RiHeart2Line } from "@react-icons/all-files/ri/RiHeart2Line";

import type { IUser } from "shared/api/user";
import { IconLink } from "shared/ui/iconLink";
import { SubjectBox } from "shared/ui/subjectBox";
import { FadeLayout } from "shared/ui/fadeLayout";
import { UserQueries } from "entities/user";
import { RecipeQueries } from "entities/recipe";
import { LoginForm } from "features/user/login";
import { RecipeGridPictures } from "widgets/recipeGridPictures";

import styles from "./recipeMyPage.module.scss";

export const RecipeMyPage = () => {
  const queryClient = useQueryClient();

  const me = queryClient.getQueryData<IUser | undefined>([UserQueries.keys.me]);
  const { data: myRecipes = [], isLoading: isMyRecipeLoading } = useQuery(
    RecipeQueries.myListQuery(me?.name)
  );
  const { data: myLikeRecipes = [], isLoading: isLikeRecipeLoading } = useQuery(
    RecipeQueries.myLikeQuery(me?.name)
  );

  if (!me) return <LoginForm className={styles.loginForm} />;

  return (
    <FadeLayout className="flex-column">
      <IconLink to={"create"} Icon={RiAddLine} className="main-button">
        레시피 만들기
      </IconLink>

      <div className={styles.myRecipeSection}>
        <SubjectBox
          Icon={RiBook2Line}
          title="내가 만든 레시피"
          headerClassName={styles.recipeBoxHeader}
        >
          <RecipeGridPictures
            recipes={myRecipes}
            isLoading={isMyRecipeLoading}
          />
        </SubjectBox>
        <SubjectBox
          Icon={RiHeart2Line}
          title="좋아요 누른 레시피"
          headerClassName={styles.recipeBoxHeader}
        >
          <RecipeGridPictures
            recipes={myLikeRecipes}
            isLoading={isLikeRecipeLoading}
          />
        </SubjectBox>
      </div>
    </FadeLayout>
  );
};
