import { Outlet, useLoaderData } from "react-router-dom";
import { useQueries, useQueryClient } from "@tanstack/react-query";
import { RiAddLine } from "@react-icons/all-files/ri/RiAddLine";

import { IUser } from "shared/api/user";
import { IconLink } from "shared/ui/iconLink";
import { IFridgeList } from "shared/api/fridge";
import { FramerFadeLayout } from "shared/ui/framerFadeLayout";
import { UserQueries } from "entities/user";
import { FridgeQueries } from "entities/fridge";
import { LoginForm } from "features/user";

import styles from "./fridgePage.module.css";

export const FridgePage = () => {
  const preFetchedFridges = useLoaderData() as IFridgeList[] | [];
  const me = useQueryClient().getQueryData([UserQueries.keys.me]) as IUser;

  const myFridges = useQueries({
    queries: preFetchedFridges.map((fridge) =>
      FridgeQueries.detailQuery(fridge._id)
    ),
  });

  if (!me) return <LoginForm className={styles.loginForm} />

  return (
    <FramerFadeLayout className="flex-column">
      <IconLink to={"new/create"} Icon={RiAddLine} className="main-button">
        냉장고 만들기
      </IconLink>
      {preFetchedFridges.map((fridge) => (
        <IconLink to={fridge._id} key={fridge._id}>{fridge.name}</IconLink>
      ))}
      {!myFridges[0].isLoading && <Outlet />}
    </FramerFadeLayout>
  );
};
