import { useInfiniteQuery } from "@tanstack/react-query";
import { ImSpoonKnife } from "@react-icons/all-files/im/ImSpoonKnife";
import { RiUserHeartLine } from "@react-icons/all-files/ri/RiUserHeartLine";

import { FadeLayout } from "shared/ui/fadeLayout";
import { RankItem, RankListSkeleton } from "shared/ui/rankItem";
import { UserQueries } from "entities/user";
import { RecipeQueries } from "entities/recipe";
import { LikeButton } from "features/recipe/like";
import { RankOverViewList } from "widgets/rankOverViewList";

import styles from "./rankOverViewPage.module.scss";

export const RankOverViewPage = () => {
  const { data: recipelikeRank, isPending: isRecipeListRankPending } =
    useInfiniteQuery(RecipeQueries.infinityQuery({ limit: 10, sort: "like" }));
  const { data: follwerRank, isPending: isFollowerRankPending } =
    useInfiniteQuery(UserQueries.InfiniteFollowerRankQuery());
  const { data: recipeMakerRank, isPending: isRecipeMakerRankPending } =
    useInfiniteQuery(UserQueries.InfiniteRecipeMakerRankQuery());

  return (
    <FadeLayout className={styles.container}>
      <h2>랭킹</h2>
      <RankOverViewList to="recipe-like" subject="좋아요가 많은 레시피">
        {isRecipeListRankPending && <RankListSkeleton />}
        {recipelikeRank?.pages[0].map((recipe, index) => (
          <RankItem
            key={recipe._id}
            to={`/recipe/${recipe._id}`}
            picture={recipe.pictures[0]}
            title={recipe.name}
            rank={index}
          >
            <LikeButton
              recipe_id={recipe._id}
              likeMembers={recipe.like_members}
              disabled
            />
          </RankItem>
        ))}
      </RankOverViewList>
      <RankOverViewList
        to="follower"
        subject="팔로워가 제일 많은 유저"
        className={styles.userRank}
      >
        {isFollowerRankPending && <RankListSkeleton />}
        {follwerRank?.pages[0].map(
          ({ _id, name, picture, follower_count }, index) => (
            <RankItem
              key={_id}
              to={`/user/${name}`}
              picture={picture}
              title={name}
              rank={index}
            >
              <div className={styles.aggregate}>
                <RiUserHeartLine />
                {follower_count}
              </div>
            </RankItem>
          )
        )}
      </RankOverViewList>
      <RankOverViewList
        to="recipe-maker"
        subject="레시피를 가장 많이 만든 유저"
        className={styles.userRank}
      >
        {isRecipeMakerRankPending && <RankListSkeleton />}
        {recipeMakerRank?.pages[0].map(
          ({ _id, recipe_count, author }, index) => (
            <RankItem
              key={_id}
              to={`/user/${author.name}`}
              picture={author.picture}
              title={author.name}
              rank={index}
            >
              <div className={styles.aggregate}>
                <ImSpoonKnife />
                {recipe_count}
              </div>
            </RankItem>
          )
        )}
      </RankOverViewList>
    </FadeLayout>
  );
};
