import { FadeLayout } from "shared/ui/fadeLayout";

import styles from "./recipeCardSkeleton.module.scss";

export const RecipeCardSkeleton = ({ count = 1 }: { count?: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <FadeLayout key={i} className={styles.card}>
          <div className={styles.image}></div>
          <div className={styles.content}>
            <div className={styles.title}></div>
            <div className={styles.subtitle}></div>
            <div className={styles.description}></div>
          </div>
        </FadeLayout>
      ))}
    </>
  );
};
