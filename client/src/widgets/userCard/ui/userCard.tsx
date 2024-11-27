import { Link } from "react-router-dom";

import { IUser } from "shared/api/user";
import { FollowButton } from "features/user/follow";

import styles from "./userCard.module.scss";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  user: IUser;
}

export const UserCard = ({ user, className, ...props }: Props) => {  
  return (
    <div className={`${className} ${styles.container}`} {...props}>
      <section className={styles.info}>
        <Link to={`/user/${user.name}`}>
          <img src={user.picture} alt="" className={styles.img} />
        </Link>
        <b>{user.name}</b>
      </section>
      <section className={styles.action}>
        <FollowButton user={user} className={styles.followButton}/>
      </section>
    </div>
  );
};
