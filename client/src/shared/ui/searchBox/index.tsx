import { RiSearchLine } from "@react-icons/all-files/ri/RiSearchLine";

import { IconButton } from "../iconButton";

import styles from "./index.module.css";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const SearchBox = ({ className, ...props }: Props) => {
  return (
    <div className={`${styles.container} ${className}`} {...props}>
      <IconButton Icon={RiSearchLine} />
      <input type="search" placeholder="재료 이름" />
    </div>
  );
};
