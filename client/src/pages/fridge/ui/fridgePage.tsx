import { Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { RiAddLine } from "@react-icons/all-files/ri/RiAddLine";

import { IconLink } from "shared/ui/iconLink";
import { FramerFadeLayout } from "shared/ui/framerFadeLayout";
import { FridgeQueries } from "entities/fridge";

export const FridgePage = () => {
  const { data: fridgeList } = useQuery(FridgeQueries.listQuery());
  // useMoveToFirstFridge(fridgeList);

  return (
    <FramerFadeLayout className="flex-column">
      <IconLink to={"new/create"} Icon={RiAddLine} className="main-button">
        냉장고 만들기
      </IconLink>
      {fridgeList?.map((fridge) => (
        <IconLink to={fridge._id} key={fridge._id}>
          {fridge.name}
        </IconLink>
      ))}
      <Outlet />
    </FramerFadeLayout>
  );
};
