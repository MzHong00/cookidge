import { useParams } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";

import { SubjectBox } from "shared/ui/subjectBox";
import { FadeLayout } from "shared/ui/fadeLayout";
import { FridgeQueries } from "entities/fridge";
import { ShareMemberBox } from "features/fridge/share";
import { UnshareMemberBox } from "features/fridge/unshare";
import { UpdateFridgeForm } from "features/fridge/update";

export const FridgeSettingPage = () => {
  const { id: fridge_id = "" } = useParams();

  const { data: fridge } = useSuspenseQuery(
    FridgeQueries.detailQuery(fridge_id)
  );

  return (
    <FadeLayout className="flex-column">
      <UpdateFridgeForm fridge_id={fridge_id} defaultName={fridge?.name} />
      <SubjectBox title="공유 멤버 관리">
        <ShareMemberBox
          fridge_id={fridge_id}
          allowed_users={fridge?.allowed_users}
        />
        <UnshareMemberBox
          fridge_id={fridge_id}
          allowed_users={fridge?.allowed_users}
        />
      </SubjectBox>
    </FadeLayout>
  );
};
