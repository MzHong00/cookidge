import { Link } from "react-router-dom";
import { RiTimer2Line } from "@react-icons/all-files/ri/RiTimer2Line";
import { RiGroupLine } from "@react-icons/all-files/ri/RiGroupLine";

import { IconBox } from "shared/ui/iconBox";
import { IRecipeCard } from "shared/api/recipe";
import { dateGap } from "shared/helper/dateGap";
import { FadeLayout } from "shared/ui/fadeLayout";
import { PicturesBox } from "shared/ui/picturesBox";

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
    <FadeLayout>
      <article className={`${styles.container} ${className}`} {...props}>
        <PicturesBox pictures={pictures} />
        <div style={{paddingInline: '0.5em'}}>
          <Link to={`/recipe/${_id}`} className={styles.infoBox}>
            <div className={styles.infoHeaderBar}>
              <h3 className={styles.title}>{name}</h3>
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
    </FadeLayout>
  );
};
