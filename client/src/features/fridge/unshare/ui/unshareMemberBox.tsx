import { useState } from "react";

import type { IUser } from "shared/api/user";
import type { IFridge } from "shared/api/fridge";
import { IconButton } from "shared/ui/iconButton";
import { ProfileImage } from "shared/ui/profileImage";
import { useConfirmDialogActions } from "shared/ui/confirmDialog";
import { useUnshareMemberMutation } from "..";

import styles from "./unshareMemberBox.module.scss";

interface Props {
  fridge_id: IFridge["_id"];
  allowed_users: IFridge["allowed_users"];
}

export const UnshareMemberBox = ({ fridge_id, allowed_users }: Props) => {
  const [selectedUser, setSelectedUser] = useState<Pick<IUser, "_id" | "name">>(
    { _id: "", name: "" }
  );

  const { openDialogMessage } = useConfirmDialogActions();
  const { mutateAsync, isPending } = useUnshareMemberMutation(
    fridge_id,
    selectedUser._id
  );

  const onClickUnshareMember = () => {
    if (!selectedUser.name || isPending) return;

    openDialogMessage({
      message: `${selectedUser.name}와의 냉장고 공유를 그만 하시겠습니까?`,
      requestFn: async () => {
        await mutateAsync();
      },
      option: { backspace: false },
    });
  };

  return (
    <div>
      <div className="flex-row">
        {allowed_users?.map((user) => (
          <button
            key={user._id}
            title={user.name}
            onClick={(e) => {
              setSelectedUser({ _id: user._id, name: e.currentTarget.title });
            }}
          >
            <ProfileImage
              src={user.picture}
              className={`${styles.profilePicture} ${
                selectedUser._id === user._id && styles.activeButton
              }`}
            />
          </button>
        ))}
      </div>

      <IconButton
        onClick={onClickUnshareMember}
        style={{ color: "white", backgroundColor: "red" }}
        className={styles.removeButton}
      >
        추방
      </IconButton>
    </div>
  );
};
