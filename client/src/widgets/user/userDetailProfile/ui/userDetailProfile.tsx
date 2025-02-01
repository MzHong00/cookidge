import { useSuspenseQueries } from "@tanstack/react-query";
import { RiUserSettingsLine } from "@react-icons/all-files/ri/RiUserSettingsLine";

import { IconBox } from "shared/ui/iconBox";
import { IconLink } from "shared/ui/iconLink";
import { ProfileImage } from "shared/ui/profileImage";
import { UserQueries } from "entities/user";
import { FollowButton } from "features/user/follow";

import styles from "./userDetailProfile.module.scss";

export const UserDetailProfile = ({ name }: { name?: string }) => {
  const [{ data: me }, { data: user }] = useSuspenseQueries({
    queries: [UserQueries.meQuery(), UserQueries.userQuery(name)],
  });

  return (
    <div className={styles.container}>
      <ProfileImage src={user?.picture} className={styles.profilePicture} />
      <div className={styles.userInfo}>
        <h2>{user?.name}</h2>
        <p>{user?.introduce}</p>
      </div>

      <div className="flex-column-center">
        <div>
          <IconBox className={styles.followBox}>
            <b>팔로우 </b>
            <span>{user?.follower.length}</span>
          </IconBox>
          <IconBox className={styles.followBox}>
            <b>팔로잉 </b>
            <span>{user?.following.length}</span>
          </IconBox>
        </div>

        <div className="flex-row">
          {user?._id === me?._id ? (
            <IconLink
              to={"/setting"}
              Icon={RiUserSettingsLine}
              className={`${styles.profileEditButton} ${styles.userActionButton}`}
            >
              프로필 편집
            </IconLink>
          ) : (
            user && <FollowButton meId={me?._id} user={user} />
          )}
        </div>
      </div>
    </div>
  );
};
