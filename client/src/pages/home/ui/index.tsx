import { FadeLayout } from "shared/ui/fadeLayout";
import { QueryWrapper } from "shared/ui/queryWrapper";
import { RecipeCardSkeleton } from "entities/recipe";
import { RecipeList } from "widgets/recipe/recipeList";
import { RecipeSearchOption } from "widgets/recipe/recipeSearchOption";

import styles from "./index.module.scss";

const SKELETON_COUNT = 2;

export const Home = () => {
  return (
    <FadeLayout className={styles.container}>
      <RecipeSearchOption />
      <QueryWrapper supenseFallback={<RecipeCardSkeleton count={SKELETON_COUNT} />}>
        <RecipeList />
      </QueryWrapper>
    </FadeLayout>
  );
};
