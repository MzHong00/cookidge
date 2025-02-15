import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import type { IUser } from "shared/api/user";
import type { IRecipe } from "shared/api/recipe";
import { dateGap } from "shared/helper/dateGap";
import { IconButton } from "shared/ui/iconButton";
import { ProfileImage } from "shared/ui/profileImage";
import { ICommentJoinUser } from "shared/api/comment";
import { UserQueries } from "entities/user";
import { RecipeQueries } from "entities/recipe";
import { DeleteCommentButton } from "features/comment/delete";

import styles from "./comment.module.scss";

export const Comment = ({ commentData }: { commentData: ICommentJoinUser }) => {
  const { _id, user_id, recipe_id, comment, created_at, user } = commentData;

  const queryClient = useQueryClient();

  const me = queryClient.getQueryData<IUser>([UserQueries.keys.me]);
  const recipe = queryClient.getQueryData<IRecipe>([
    RecipeQueries.keys.root,
    recipe_id,
  ]);

  const deleteAuthorize =
    recipe && (user_id === me?._id || recipe.author_id === me?._id);

  return (
    <div className={styles.container}>
      <Link to={`/user/${user[0].name}`}>
        <IconButton className={styles.profileButton}>
          <ProfileImage src={user[0].picture} />
        </IconButton>
      </Link>
      <div>
        <header className={styles.nameBar}>
          <h4>{user[0].name}</h4>
          {created_at && <p>{dateGap(created_at)}전</p>}
          {deleteAuthorize && (
            <div className={styles.actionBar}>
              <DeleteCommentButton
                comment_id={_id}
                recipe_id={recipe_id}
                author_id={recipe.author_id}
              />
            </div>
          )}
        </header>
        <p>{comment}</p>
      </div>
    </div>
  );
};
