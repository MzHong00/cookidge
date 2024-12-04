import { useSearchParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { RiUser3Line } from "@react-icons/all-files/ri/RiUser3Line";

import { SearchBox } from "shared/ui/searchBox";
import { useIntersectionObserver } from "shared/hooks/useIntersectionObserver";
import { UserQueries } from "entities/user";
import { useParamsDebounce } from "widgets/recipeSearch";
import { UserCard } from "widgets/userCard";

import styles from "./userSearchBox.module.scss";
import { IconButton } from "shared/ui/iconButton";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  actionButtonText?: string;
  onClickUserAction?: React.MouseEventHandler<HTMLButtonElement>;
}

export const UserSearchBox = ({
  actionButtonText,
  onClickUserAction,
  className,
  children,
  ...props
}: Props) => {
  const [searchParams] = useSearchParams();
  const { value, onChangeRecipeSearch } = useParamsDebounce();

  const {
    data: userPages,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    UserQueries.InfiniteSearchQuery({ user_name: searchParams.get("q") || "" })
  );
  const { setTarget } = useIntersectionObserver({ hasNextPage, fetchNextPage });

  return (
    <div className={`${styles.container} ${className}`} {...props}>
      <SearchBox
        value={value}
        placeholder="사용자 이름을 입력하세요"
        onChange={onChangeRecipeSearch}
        className={styles.searchInput}
      />
      {userPages?.pages.map((page) =>
        page.map((user) => (
          <UserCard key={user._id} name={user.name} picture={user.picture}>
            <section className={styles.userInfoSection}>
              <div className={styles.userIntroduce}>{user.introduce}</div>
              <div className={styles.userFollow}>
                <RiUser3Line />
                <span>{user.follower_count}</span>
                {onClickUserAction && (
                  <IconButton
                    className="main-button"
                    onClick={onClickUserAction}
                    data-user_id={user._id}
                  >{`${actionButtonText || "선택"}`}</IconButton>
                )}
              </div>
            </section>
          </UserCard>
        ))
      )}
      <div id="observer" ref={setTarget} />
    </div>
  );
};
