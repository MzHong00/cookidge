import { useSearchParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { RiUserReceived2Line } from "@react-icons/all-files/ri/RiUserReceived2Line";

import { SearchBox } from "shared/ui/searchBox";
import { IconButton } from "shared/ui/iconButton";
import { useParamsDebounce } from "shared/hooks/useParamsDebounce";
import { useIntersectionObserver } from "shared/hooks/useIntersectionObserver";
import { UserCard, UserQueries } from "../..";

import styles from "./userSearchBox.module.scss";

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
                <RiUserReceived2Line />
                <span>{user.follower_count}</span>
                {onClickUserAction && (
                  <IconButton
                    className="main-button"
                    onClick={onClickUserAction}
                    data-user_id={user._id}
                    data-user_name={user.name}
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
