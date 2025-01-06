import { useInfiniteQuery } from "@tanstack/react-query";
import { RiUserReceived2Line } from "@react-icons/all-files/ri/RiUserReceived2Line";

import { SearchBox } from "shared/ui/searchBox";
import { IconButton } from "shared/ui/iconButton";
import { FadeLayout } from "shared/ui/fadeLayout";
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
  const { query, value, onChangeRecipeSearch } = useParamsDebounce("q");

  const {
    data: userPages,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(UserQueries.InfiniteSearchQuery({ user_name: query }));
  const { setTarget } = useIntersectionObserver({ hasNextPage, fetchNextPage });

  return (
    <>
      <SearchBox
        value={value}
        placeholder="사용자 이름을 입력하세요"
        style={{ padding: "1rem" }}
        onChange={onChangeRecipeSearch}
      />
      {userPages?.pages.map((page) =>
        page.map((user) => (
          <UserCard
            key={user._id}
            name={user.name}
            picture={user.picture}
          >
            <div className={styles.userFollow}>
              <RiUserReceived2Line />
              <span>{user.follower_count}</span>
              {onClickUserAction && (
                <IconButton
                  className="main-button"
                  onClick={onClickUserAction}
                  data-user_id={user._id}
                  data-user_name={user.name}
                >
                  {actionButtonText || "선택"}
                </IconButton>
              )}
            </div>
          </UserCard>
        ))
      )}
      <div id="observer" ref={setTarget} />
    </>
  );
};
