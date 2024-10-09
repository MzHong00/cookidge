import { type Comment } from "shared/types";
import { IconButton } from "shared/ui/iconButton";
import { dateGap } from "shared/helper/dateGap";

import styles from "./chat.module.css";

interface Props extends React.HTMLAttributes<HTMLDivElement>, Comment {}

export const Chat = ({
  user_id,
  comment,
  created_at,
  className,
  ...props
}: Props) => {
  return (
    <div className={`${styles.container} ${className}`} {...props}>
      <IconButton src="https://lh3.googleusercontent.com/a/AEdFTp4pPqM6NpOpPqG-cAg1vMo6k6PwFlei8v1deyEJ=s96-c" />
      <div className={styles.contentBox}>
        <header className={styles.header}>
          <h3>name</h3>
          {created_at && <p>{dateGap(created_at)}</p>}
        </header>
        <p>{comment}</p>
      </div>
    </div>
  );
};
