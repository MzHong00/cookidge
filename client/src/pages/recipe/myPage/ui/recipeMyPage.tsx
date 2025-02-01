import { useQuery } from "@tanstack/react-query";
import { RiAddLine } from "@react-icons/all-files/ri/RiAddLine";
import { RiBook2Line } from "@react-icons/all-files/ri/RiBook2Line";
import { RiHeart2Line } from "@react-icons/all-files/ri/RiHeart2Line";

import { IconLink } from "shared/ui/iconLink";
import { SubjectBox } from "shared/ui/subjectBox";
import { FadeLayout } from "shared/ui/fadeLayout";
import { RecipeGridPictures } from "shared/ui/recipeGridPictures";
import { UserQueries } from "entities/user";
import { RecipeQueries } from "entities/recipe";

import styles from "./recipeMyPage.module.scss";

export const RecipeMyPage = () => {
  const { data: me } = useQuery(UserQueries.meQuery());
  const { data: myRecipes = [], isFetching: isMyRecipeLoading } = useQuery(
    RecipeQueries.myListQuery(me?.name)
  );
  const { data: myLikeRecipes = [], isFetching: isLikeRecipeLoading } = useQuery(
    RecipeQueries.myLikeQuery(me?.name)
  );

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
            isFetching={isMyRecipeLoading}
          />
        </SubjectBox>
        <SubjectBox
          Icon={RiHeart2Line}
          title="좋아요 누른 레시피"
          headerClassName={styles.recipeBoxHeader}
        >
          <RecipeGridPictures
            recipes={myLikeRecipes}
            isFetching={isLikeRecipeLoading}
          />
        </SubjectBox>
      </div>
    </FadeLayout>
  );
};
