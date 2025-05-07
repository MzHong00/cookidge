import { Link } from "react-router-dom";
import { RiVipCrownFill } from "@react-icons/all-files/ri/RiVipCrownFill";

import type { IFridge } from "shared/api/fridge";
import { IconBox } from "shared/ui/iconBox";
import { ProfileImage } from "shared/ui/profileImage";

import styles from "./sharedMemberList.module.scss";

export const SharedMemberList = ({
  owner_id,
  allowed_users,
}: Pick<IFridge, "owner_id" | "allowed_users">) => {
  return (
    <div className="flex-row">
      {allowed_users?.map((user) => (
        <Link
          key={user._id}
          to={`/user/${user.name}`}
          className={styles.profileLink}
        >
          <ProfileImage
            src={user.picture}
            title={user.name}
            style={{ width: "20px" }}
          />
          {owner_id === user._id && (
            <IconBox Icon={RiVipCrownFill} className={styles.profileIcon} />
          )}
        </Link>
      ))}
    </div>
  );
};
