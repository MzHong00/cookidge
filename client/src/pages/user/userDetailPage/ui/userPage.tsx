import { useParams } from "react-router-dom";

import { FadeLayout } from "shared/ui/fadeLayout";
import { QueryWrapper } from "shared/ui/queryWrapper";
import { LoadingSpinner } from "shared/ui/loadingSpinner";
import {
  UserDetailProfile,
  UserDetailRecipes,
} from "widgets/user/userDetailProfile";
import { NotFound } from "widgets/notFound";

import styles from "./userPage.module.scss";

export const UserPage = () => {
  const { name } = useParams();

  return (
    <FadeLayout className={styles.container}>
      <QueryWrapper
        supenseFallback={<LoadingSpinner msg="사용자를 불러오는 중.." />}
        errorFallback={() => <NotFound />}
      >
        <UserDetailProfile name={name} />
        <UserDetailRecipes name={name} />
      </QueryWrapper>
    </FadeLayout>
  );
};
