import { Link } from "react-router-dom";

import type { IFridge } from "shared/api/fridge";
import { ProfileImage } from "shared/ui/profileImage";

interface Props {
  allowed_users: IFridge["allowed_users"];
}

export const SharedMemberList = ({ allowed_users }: Props) => {
  return (
    <div className="flex-row">
      {allowed_users?.map((user) => (
        <Link key={user._id} to={`/user/${user.name}`}>
          <ProfileImage
            src={user.picture}
            title={user.name}
            style={{ width: "20px" }}
          />
        </Link>
      ))}
    </div>
  );
};
