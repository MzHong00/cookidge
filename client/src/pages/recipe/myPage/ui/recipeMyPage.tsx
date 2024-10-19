import { RiBook2Line } from "@react-icons/all-files/ri/RiBook2Line";
import { RiHeart2Line } from "@react-icons/all-files/ri/RiHeart2Line";
import { RiAddLine } from "@react-icons/all-files/ri/RiAddLine";
import { IoReload } from "@react-icons/all-files/io5/IoReload";
import { FaMagic } from "@react-icons/all-files/fa/FaMagic";

import { IconLink } from "shared/ui/iconLink";
import { IconButton } from "shared/ui/iconButton";
import { SubjectBox } from "shared/ui/subjectBox";
import { FramerFadeLayout } from "shared/ui/framerFadeLayout";

import styles from "./recipeMyPage.module.css";

export const RecipeMyPage = () => {
  return (
    <FramerFadeLayout className={styles.pageContainer}>
      <IconLink
        to={"create"}
        Icon={RiAddLine}
        className={styles.createRecipeButton}
      >
        레시피 만들기
      </IconLink>

      <div className={styles.recipeOverviewSection}>
        <SubjectBox
          Icon={RiBook2Line}
          title="내가 만든 레시피"
          headerClassName={styles.attachChildHeader}
        />
        <SubjectBox
          Icon={RiHeart2Line}
          title="좋아요 누른 레시피"
          headerClassName={styles.attachChildHeader}
        />
      </div>

      <SubjectBox
        title="레시피 추천"
        subtitle="현재 냉장고 재료를 기반으로 한 추천 레시피"
      >
        <section className={styles.recipeRecommendSection}>
          <IconButton Icon={IoReload} className={styles.recommendReloadButton}>
            레시피 추천
          </IconButton>
          <IconButton Icon={FaMagic} className={styles.recommendToAiButton}>
            AI 추천
          </IconButton>
        </section>
      </SubjectBox>
    </FramerFadeLayout>
  );
};
