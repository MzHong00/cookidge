import { To } from "react-router-dom";
import { ImSpoonKnife } from "@react-icons/all-files/im/ImSpoonKnife";

import { IconBox } from "../iconBox";
import { IconLink } from "../iconLink";

import styles from "./index.module.css";

export const Logo = ({ to, className }: { to?: To; className?: string }) => {
  if (to)
    return (
      <IconLink
        to={to}
        Icon={ImSpoonKnife}
        className={`${className} ${styles.logo}`}
      >
        <h4>Cookidge</h4>
      </IconLink>
    );

  return (
    <IconBox Icon={ImSpoonKnife} className={`${className} ${styles.logo}`}>
      <h4>Cookidge</h4>
    </IconBox>
  );
};
