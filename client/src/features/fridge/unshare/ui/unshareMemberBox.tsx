import { useState } from "react";

import { IFridge } from "shared/api/fridge";
import { IconButton } from "shared/ui/iconButton";
import { ProfileImage } from "shared/ui/profileImage";
import { useUnshareMemberMutation } from "..";

import styles from "./unshareMemberBox.module.css";
import { FridgeQueries } from "entities/fridge";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  fridge_id: IFridge["_id"];
  allowed_users: IFridge["allowed_users"];
}

export const UnshareMemberBox = ({ fridge_id, allowed_users }: Props) => {
  const queryClient = useQueryClient();
  const [selectedUserId, setSelectedUserId] = useState<string>();

  const { mutate, isPending } = useUnshareMemberMutation(fridge_id);

  const onClickUnshareMember = () => {
    if (!selectedUserId || isPending) return;

    mutate(selectedUserId, {
      onSuccess: () => {
        queryClient.setQueryData(
          [FridgeQueries.keys.detail, fridge_id],
          (data: IFridge) => ({
            ...data,
            allowed_users: data.allowed_users?.filter(
              (user) => user._id !== selectedUserId
            ),
          })
        );
      },
    });
  };

  return (
    <div>
      <div className="flex-row">
        {allowed_users?.map((user) => (
          <button
            key={user._id}
            onClick={() => {
              setSelectedUserId(user._id);
            }}
          >
            <ProfileImage
              src={user.picture}
              title={user.name}
              className={`${styles.profilePicture} ${
                selectedUserId === user._id && styles.activeButton
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
