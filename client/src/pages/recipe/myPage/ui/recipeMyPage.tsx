import { RiBook2Line } from "@react-icons/all-files/ri/RiBook2Line";
import { RiHeart2Line } from "@react-icons/all-files/ri/RiHeart2Line";
import { RiAddLine } from "@react-icons/all-files/ri/RiAddLine";
import { IoReload } from "@react-icons/all-files/io5/IoReload";
import { FaMagic } from "@react-icons/all-files/fa/FaMagic";

import { IconLink } from "shared/ui/iconLink";
import { IconButton } from "shared/ui/iconButton";
import { SubjectBox } from "shared/ui/subjectBox";

import styles from './recipeMyPage.module.css'

export const RecipeMyPage = () => {

    return (
        <>
          <IconLink
            to={'create'}
            Icon={RiAddLine}
            title="레시피 만들기"
            className={styles.createRecipeButton}
          />

          <div className={styles.recipeOverviewSection}>
            <SubjectBox
              Icon={RiBook2Line}
              title="내가 만든 레시피"
              headerClassName={styles.attachChildHeader}
            ></SubjectBox>
            <SubjectBox
              Icon={RiHeart2Line}
              title="좋아요 누른 레시피"
              headerClassName={styles.attachChildHeader}
            ></SubjectBox>
          </div>

          <SubjectBox
            title="레시피 추천"
            subtitle="현재 냉장고 재료를 기반으로 한 추천 레시피"
          >
            <section className={styles.recipeRecommendSection}>
              <IconButton
                Icon={IoReload}
                title="레시피 추천"
                className={styles.recommendReloadButton}
              />
              <IconButton
                Icon={FaMagic}
                title="AI 추천"
                className={styles.recommendToAiButton}
              />
            </section>
          </SubjectBox>
        </>
    )
}