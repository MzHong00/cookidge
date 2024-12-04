import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import { IUser } from "shared/api/user";
import { IconButton } from "shared/ui/iconButton";
import { dateGap } from "shared/helper/dateGap";
import { UserQueries } from "entities/user";
import { DeleteCommentButton } from "features/comment/delete";

import styles from "./comment.module.css";
import { ICommentDTO } from "shared/api/comment/type";
import { ProfileImage } from "shared/ui/profileImage";

interface Props extends React.HTMLAttributes<HTMLDivElement>, ICommentDTO {}

export const Comment = ({
  user,
  _id,
  comment,
  recipe_id,
  user_id,
  created_at,
  className,
  ...props
}: Props) => {
  const me = useQueryClient().getQueryData<IUser>([UserQueries.keys.me]);

  return (
    <div className={`${styles.container} ${className}`} {...props}>
      <Link to={`/user/${user[0].name}`}>
        <IconButton className={styles.profileButton}>
          <ProfileImage src={user[0].picture} />
        </IconButton>
      </Link>
      <div className={styles.contentBox}>
        <header className={styles.nameBar}>
          <h4>{user[0].name}</h4>
          {created_at && <p>{dateGap(created_at)}전</p>}
          {user_id === me?._id && (
            <div className={styles.actionBar}>
              <DeleteCommentButton recipe_id={recipe_id} commentId={_id} />
            </div>
          )}
        </header>
        <p className={styles.comment}>{comment}</p>
      </div>
    </div>
  );
};
