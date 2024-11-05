import { useQueryClient } from "@tanstack/react-query";
import { RiBook2Line } from "@react-icons/all-files/ri/RiBook2Line";
import { RiHeart2Line } from "@react-icons/all-files/ri/RiHeart2Line";
import { RiAddLine } from "@react-icons/all-files/ri/RiAddLine";
import { IoReload } from "@react-icons/all-files/io5/IoReload";
import { FaMagic } from "@react-icons/all-files/fa/FaMagic";

import { IUser } from "shared/api/user";
import { IconLink } from "shared/ui/iconLink";
import { IconButton } from "shared/ui/iconButton";
import { SubjectBox } from "shared/ui/subjectBox";
import { FramerFadeLayout } from "shared/ui/framerFadeLayout";
import { UserQueries } from "entities/user";
import { LoginForm } from "features/user";

import styles from "./recipeMyPage.module.css";

export const RecipeMyPage = () => {
  const me = useQueryClient().getQueryData([UserQueries.keys.me]) as IUser;

  if (!me) return <LoginForm className={styles.loginForm} />

  return (
    <FramerFadeLayout className="flex-column">
      <IconLink
        to={"create"}
        Icon={RiAddLine}
        className="main-button"
      >
        레시피 만들기
      </IconLink>

      <div className="flex-row">
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
        <section className="flex-row">
          <IconButton Icon={IoReload} className={styles.recommendReloadButton}>
            레시피 추천
          </IconButton>
          <IconButton Icon={FaMagic} className="main-button">
            AI 추천
          </IconButton>
        </section>
      </SubjectBox>
    </FramerFadeLayout>
  );
};
