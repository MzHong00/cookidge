import { Link } from "react-router-dom";
import { RiGroupLine } from "@react-icons/all-files/ri/RiGroupLine";
import { RiTimer2Line } from "@react-icons/all-files/ri/RiTimer2Line";

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
        <div>
          <Link to={`/recipe/${_id}`} className={styles.content}>
            <div>
              <h3>{name}</h3>
              <span>{dateGap(created_at)}전</span>
            </div>
            <div>
              <IconBox Icon={RiTimer2Line}>조리시간 {cooking_time}분</IconBox>
              <IconBox Icon={RiGroupLine}>{servings}인분</IconBox>
            </div>
            <p>{introduction}</p>
          </Link>
          {children}
        </div>
      </article>
    </FadeLayout>
  );
};
