import { useSuspenseQuery } from "@tanstack/react-query";
import { UserQueries } from "entities/user";
import { UserEditForm } from "features/user/edit";
import { DeleteUserButton } from "features/user/delete";

import styles from "./userEdit.module.scss";

export const UserEdit = () => {
  const { data: me } = useSuspenseQuery(UserQueries.meQuery());

  return (
    <>
      {me && <UserEditForm user={me} />}
      <DeleteUserButton className={styles.deleteButton} />
    </>
  );
};
