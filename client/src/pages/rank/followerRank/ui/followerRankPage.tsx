import { useInfiniteQuery } from "@tanstack/react-query";
import { RiUserHeartLine } from "@react-icons/all-files/ri/RiUserHeartLine";

import { SubjectBox } from "shared/ui/subjectBox";
import { RankItem, RankItemSkeleton } from "shared/ui/rankItem";
import { useIntersectionObserver } from "shared/hooks/useIntersectionObserver";
import { UserQueries } from "entities/user";

import styles from "./followerRankPage.module.scss";

export const FollowerRankPage = () => {
  const skeletonCount = 3 + Math.floor(Math.random() * 3);

  const {
    data: follwerRank,
    hasNextPage,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery(UserQueries.InfiniteFollowerRankQuery());
  const { setTarget } = useIntersectionObserver({
    options: { rootMargin: "300px" },
    hasNextPage,
    fetchNextPage,
  });

  return (
    <SubjectBox title="팔로워가 제일 많은 유저" className={styles.container}>
      {follwerRank?.pages.map((page, pageIndex) =>
        page.map(({ _id, name, picture, follower_count }, index) => (
          <RankItem
            key={_id}
            to={`/user/${name}`}
            picture={picture}
            title={name}
            rank={index + pageIndex}
          >
            <div className={styles.aggregate}>
              <RiUserHeartLine />
              {follower_count}
            </div>
          </RankItem>
        ))
      )}
      {isFetching &&
        Array.from({ length: skeletonCount }).map((_, i) => (
          <RankItemSkeleton key={i} rank={i} />
        ))}
      <div id="observer" ref={setTarget} style={{ minHeight: "4em" }}></div>
    </SubjectBox>
  );
};
