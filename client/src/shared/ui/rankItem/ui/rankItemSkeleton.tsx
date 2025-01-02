import rankItemStyles from "./rankItem.module.scss";
import skeletonStyles from "./rankItemSkeleton.module.scss";

export const RankListSkeleton = () => {
  const skeletonCount = 3 + Math.floor(Math.random() * 3);

  return (
    <>
      {Array.from({ length: skeletonCount }).map(() => (
        <div
          className={`${rankItemStyles.container} ${skeletonStyles.skeleton}`}
        >
          <span></span>
          <div></div>
          <p></p>
        </div>
      ))}
    </>
  );
};
