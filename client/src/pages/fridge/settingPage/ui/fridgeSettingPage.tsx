import { useQuery } from "@tanstack/react-query";
import { FridgeQueries } from "entities/fridge";
import { useShareMemberMutation } from "features/fridge/share";
import { UnshareMemberBox } from "features/fridge/unshare/ui/unshareMemberBox";
import { UpdateFridgeForm } from "features/fridge/update";
import { useParams } from "react-router-dom";
import { SubjectBox } from "shared/ui/subjectBox";
import { UserSearchBox } from "widgets/userSearch";

export const FridgeSettingPage = () => {
  const { id: fridgde_id } = useParams();

  const { data: fridge } = useQuery(FridgeQueries.detailQuery(fridgde_id));
  const { mutate, isPending } = useShareMemberMutation(fridgde_id);

  const onClickAddSharedMember = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const userId = e.currentTarget.dataset?.user_id;
    if (!userId || isPending) return;

    mutate(userId);
  };

  if (!fridgde_id) return null;

  return (
    <div className="flex-column">
      <UpdateFridgeForm fridge_id={fridgde_id} defaultName={fridge?.name} />
      <SubjectBox title="공유 멤버 관리">
        <UserSearchBox
          actionButtonText="초대"
          onClickUserAction={onClickAddSharedMember}
        />
        <UnshareMemberBox
          fridge_id={fridgde_id}
          allowed_users={fridge?.allowed_users}
        />
      </SubjectBox>
    </div>
  );
};
