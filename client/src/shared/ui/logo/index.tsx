import { ImSpoonKnife } from "@react-icons/all-files/im/ImSpoonKnife";

import { IconBox } from "../iconBox";

import styles from "./index.module.css";

interface Props {
  className?: string;
}

export const Logo = ({ className }: Props) => {
  return (
    <IconBox Icon={ImSpoonKnife} className={`${className} ${styles.logo}`}>
      <h4>Cookidge</h4>
    </IconBox>
  );
};
