import { FramerFadeLayout } from "shared/ui/framerFadeLayout";

import styles from "./recipeCardSkeleton.module.scss";

export const RecipeCardSkeleton = () => {
  return (
    <FramerFadeLayout>
      <div className={styles.card}>
        <div className={styles.image}></div>
        <div className={styles.textContainer}>
          <div className={styles.title}></div>
          <div className={styles.subtitle}></div>
          <div className={styles.description}></div>
        </div>
      </div>
    </FramerFadeLayout>
  );
};
