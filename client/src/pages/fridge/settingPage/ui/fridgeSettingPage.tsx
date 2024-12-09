import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { SubjectBox } from "shared/ui/subjectBox";
import { FridgeQueries } from "entities/fridge";
import { UnshareMemberBox } from "features/fridge/unshare/ui/unshareMemberBox";
import { UpdateFridgeForm } from "features/fridge/update";
import { ShareMemberBox } from "features/fridge/share";

export const FridgeSettingPage = () => {
  const { id: fridge_id } = useParams();

  const { data: fridge } = useQuery(FridgeQueries.detailQuery(fridge_id));

  if (!fridge_id) return null;

  return (
    <div className="flex-column">
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
    </div>
  );
};
