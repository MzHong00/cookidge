import { Outlet } from "react-router-dom";
import { RiAddLine } from "@react-icons/all-files/ri/RiAddLine";

import { IconLink } from "shared/ui/iconLink";
import { FadeLayout } from "shared/ui/fadeLayout";
import { FridgeList } from "entities/fridge";

export const FridgeMyListPage = () => {

  return (
    <FadeLayout className="flex-column">
      <IconLink to={"new/create"} Icon={RiAddLine} className="main-button">
        냉장고 만들기
      </IconLink>
      <FridgeList />
      <Outlet />
    </FadeLayout>
  );
};
