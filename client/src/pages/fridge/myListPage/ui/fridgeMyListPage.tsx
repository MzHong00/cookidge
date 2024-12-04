import { Outlet } from "react-router-dom";
import { RiAddLine } from "@react-icons/all-files/ri/RiAddLine";

import { IconLink } from "shared/ui/iconLink";
import { FramerFadeLayout } from "shared/ui/framerFadeLayout";
import { FridgeList } from "widgets/fridgeList";

export const FridgeMyListPage = () => {

  return (
    <FramerFadeLayout className="flex-column">
      <IconLink to={"new/create"} Icon={RiAddLine} className="main-button">
        냉장고 만들기
      </IconLink>
      <FridgeList />
      <Outlet />
    </FramerFadeLayout>
  );
};
