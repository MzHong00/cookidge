import { useParams } from "react-router-dom";

import { FadeLayout } from "shared/ui/fadeLayout";
import { LoadingSpinner } from "shared/ui/loadingSpinner";
import { NotFound } from "widgets/notFound";
import { CommentWidget } from "widgets/comment";
import { RecipeDetailWidget } from "widgets/recipe/recipeDetail";
import { QueryWrapper } from "shared/ui/queryWrapper";

export const RecipeDetailPage = () => {
  const { id = "" } = useParams();

  return (
    <FadeLayout className="flex-column">
      <QueryWrapper
        supenseFallback={<LoadingSpinner msg="레시피 읽는 중..." />}
        errorFallback={() => <NotFound msg="레시피를 찾지 못했어요..!" />}
      >
        <RecipeDetailWidget recipe_id={id} />
        <QueryWrapper supenseFallback={<LoadingSpinner msg="댓글 읽는 중..." />}>
          <CommentWidget recipe_id={id} />
        </QueryWrapper>
      </QueryWrapper>
    </FadeLayout>
  );
};
