import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { RiFridgeLine } from "@react-icons/all-files/ri/RiFridgeLine";

import { IconLink } from "shared/ui/iconLink";
import { FridgeQueries } from "entities/fridge";

import styles from "./fridgeList.module.scss";

export const FridgeList = () => {
  const { id } = useParams();
  const { data: fridgeList } = useQuery(FridgeQueries.listQuery());

  return (
    <section className={styles.container}>
      {fridgeList?.map((fridge) => (
        <IconLink
          to={`detail/${fridge._id}`}
          key={fridge._id}
          className={`${styles.fridgeButton} ${
            fridge._id === id && styles.active
          }`}
        >
          <RiFridgeLine />
          {fridge.name}
        </IconLink>
      ))}
    </section>
  );
};
