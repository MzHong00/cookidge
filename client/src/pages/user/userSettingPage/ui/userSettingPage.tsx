import { FadeLayout } from "shared/ui/fadeLayout";
import { QueryWrapper } from "shared/ui/queryWrapper";
import { LoadingSpinner } from "shared/ui/loadingSpinner";
import { UserEdit } from "widgets/user/userEdit";

import styles from "./userSettingPage.module.scss";

export const UserSettingPage = () => {
  return (
    <FadeLayout className={styles.page}>
      <QueryWrapper
        supenseFallback={<LoadingSpinner msg="사용자 정보 가져오는 중..." />}
      >
        <UserEdit />
      </QueryWrapper>
    </FadeLayout>
  );
};
