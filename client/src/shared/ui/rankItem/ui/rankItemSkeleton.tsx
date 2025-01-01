import rankItemStyles from "./rankItem.module.scss";
import skeletonStyles from "./rankItemSkeleton.module.scss";

interface Props {
  rank: number;
}

export const RankItemSkeleton = ({ rank }: Props) => {
  const ranking =
    (rank === 0 && "🥇") ||
    (rank === 1 && "🥈") ||
    (rank === 2 && "🥉") ||
    rank + 1;

  return (
    <div className={`${rankItemStyles.container} ${skeletonStyles.skeleton}`}>
      <span>{ranking}</span>
      <div></div>
      <p></p>
    </div>
  );
};
