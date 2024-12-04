import { RiSearchLine } from "@react-icons/all-files/ri/RiSearchLine";

import { IconButton } from "../iconButton";

import styles from "./index.module.css";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export const SearchBox = ({ className, ...props }: Props) => {
  return (
    <div className={`${styles.container} ${className}`} >
      <IconButton Icon={RiSearchLine} />
      <input type="search" {...props}/>
    </div>
  );
};
