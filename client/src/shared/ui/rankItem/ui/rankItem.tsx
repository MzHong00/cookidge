import { Link, LinkProps } from "react-router-dom";

import { CldImg } from "shared/ui/cloudinaryImage/cloudinaryImage";

import styles from "./rankItem.module.scss";

interface Props extends LinkProps {
  to: string;
  picture: string;
  title: string;
  rank: number;
}

export const RankItem = ({
  to,
  picture,
  title,
  rank,
  children,
  className,
  ...props
}: Props) => {
  const ranking =
    (rank === 0 && "🥇") ||
    (rank === 1 && "🥈") ||
    (rank === 2 && "🥉") ||
    rank + 1;

  return (
    <Link to={to} className={`${styles.container} ${className}`} {...props}>
      <div className={styles.info}>
        <span>{ranking}</span>
        <CldImg cldImg={picture}/>
        <p>{title}</p>
      </div>
      {children}
    </Link>
  );
};
