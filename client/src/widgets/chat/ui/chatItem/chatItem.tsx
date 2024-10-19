import { Link } from "react-router-dom";

import { type Comment } from "shared/types";
import { IconButton } from "shared/ui/iconButton";
import { dateGap } from "shared/helper/dateGap";

import styles from "./chatItem.module.css";

interface Props extends React.HTMLAttributes<HTMLDivElement>, Omit<Comment, 'recipe_id'> {}

export const ChatItem = ({
  user_id,
  comment,
  created_at,
  className,
  ...props
}: Props) => {
  return (
    <div className={`${styles.container} ${className}`} {...props}>
      <Link to={user_id}>
        <IconButton
          src="https://lh3.googleusercontent.com/a/AEdFTp4pPqM6NpOpPqG-cAg1vMo6k6PwFlei8v1deyEJ=s96-c"
          className={styles.profileButton}
        />
      </Link>
      <div className={styles.contentBox}>
        <header className={styles.nameBar}>
          <h4>홍길동</h4>
          {created_at && <p>{dateGap(created_at)}</p>}
        </header>
        <p className={styles.comment}>{comment}</p>
      </div>
    </div>
  );
};
