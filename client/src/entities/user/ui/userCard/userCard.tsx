import { Link } from "react-router-dom";

import type { IUser } from "shared/api/user";
import { ProfileImage } from "shared/ui/profileImage";

import styles from "./userCard.module.scss";

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
    Pick<IUser, "name" | "picture"> {}

export const UserCard = ({
  name,
  picture,
  className,
  children,
  ...props
}: Props) => {
  return (
    <div className={`${className} ${styles.container}`} {...props}>
      <section className={styles.info}>
        <Link to={`/user/${name}`}>
          <ProfileImage src={picture} className={styles.img} />
        </Link>
        <b className={styles.name}>{name}</b>
      </section>
      {children}
    </div>
  );
};
