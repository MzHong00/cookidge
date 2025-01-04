import type { IRecipe } from "shared/api/recipe";
import { SubjectBox } from "shared/ui/subjectBox";
import { CommentList } from "entities/comment";
import { CreateComment } from "features/comment/create";

interface Props {
  recipe_id: IRecipe["_id"];
}

export const CommentWidget = ({ recipe_id }: Props) => {
  return (
    <SubjectBox title="댓글" style={{ border: "none" }}>
      <CreateComment recipeId={recipe_id} />
      <CommentList recipe_id={recipe_id} />
    </SubjectBox>
  );
};
