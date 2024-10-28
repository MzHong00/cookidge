import { ImSpoonKnife } from "@react-icons/all-files/im/ImSpoonKnife";

import { IconLink } from "../iconLink";

import styles from "./index.module.css";

interface Props {
  className?: string;
}

export const Logo = ({ className }: Props) => {
  return (
    <IconLink
      to={"/"}
      Icon={ImSpoonKnife}
      className={`${className} ${styles.logo}`}
    >
      <span>Cookidge</span>
    </IconLink>
  );
};
