import { useQueryClient } from "@tanstack/react-query";

import { IUser } from "shared/api/user";
import { FramerFadeLayout } from "shared/ui/framerFadeLayout";
import { UserQueries } from "entities/user";
import { UserEditForm } from "features/user/edit";
import { DeleteUserButton } from "features/user/delete";

import styles from "./userSettingPage.module.scss";

export const UserSettingPage = () => {
  const me = useQueryClient().getQueryData([UserQueries.keys.me]) as IUser | undefined;
  
  if(!me) return <div>올바르지 않은 요청입니다.</div>

  return (
    <FramerFadeLayout className={styles.page}>
      <UserEditForm />
      <DeleteUserButton className={styles.deleteButton} />
    </FramerFadeLayout>
  );
};
