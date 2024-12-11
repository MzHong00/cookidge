import { Link } from "react-router-dom";
import { RiTimer2Line } from "@react-icons/all-files/ri/RiTimer2Line";
import { RiGroupLine } from "@react-icons/all-files/ri/RiGroupLine";

import { IconBox } from "shared/ui/iconBox";
import { dateGap } from "shared/helper/dateGap";
import { IRecipeCard } from "shared/api/recipe";
import { PicturesBox } from "shared/ui/picturesBox";
import { FramerFadeLayout } from "shared/ui/framerFadeLayout";

import styles from "./recipeCard.module.scss";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  recipe: IRecipeCard;
  isThumbnaileMode?: boolean;
}

export const RecipeCard = ({
  recipe,
  className,
  children,
  ...props
}: Props) => {
  const {
    _id,
    name,
    pictures,
    introduction,
    servings,
    cooking_time,
    created_at,
  } = recipe;

  return (
    <FramerFadeLayout>
      <article className={`${styles.container} ${className}`} {...props}>
        {pictures.length !== 0 && <PicturesBox pictures={pictures} />}
        <div>
          <Link to={`/recipe/${_id}`} className={styles.infoBox}>
            <div className={styles.infoHeaderBar}>
              <h2 className={styles.title}>{name}</h2>
              <span className={styles.created_at}>{dateGap(created_at)}전</span>
            </div>
            <div className={styles.subInfo}>
              <IconBox Icon={RiTimer2Line}>조리시간 {cooking_time}분</IconBox>
              <IconBox Icon={RiGroupLine}>{servings}인분</IconBox>
            </div>
            <p className={styles.introduction}>{introduction}</p>
          </Link>
          {children}
        </div>
      </article>
    </FramerFadeLayout>
  );
};
