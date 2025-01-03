import { useQuery } from "@tanstack/react-query";

import { FadeLayout } from "shared/ui/fadeLayout";
import { UserQueries } from "entities/user";
import { UserEditForm } from "features/user/edit";
import { DeleteUserButton } from "features/user/delete";

import styles from "./userSettingPage.module.scss";

export const UserSettingPage = () => {
  const { data: me } = useQuery(UserQueries.meQuery());

  if (!me) return <div>올바르지 않은 요청입니다.</div>;

  return (
    <FadeLayout className={styles.page}>
      <UserEditForm />
      <DeleteUserButton className={styles.deleteButton} />
    </FadeLayout>
  );
};
