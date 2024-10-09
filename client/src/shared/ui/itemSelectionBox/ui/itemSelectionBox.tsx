import { IconButton } from "shared/ui/iconButton";

import styles from "./itemSelectionBox.module.css";

interface Props {
  itemList?: string[];
  activeItem?: string;
  activeIndex?: number;
  onclick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  className?: string;
}

export const ItemSelectionBox = ({
  itemList,
  activeItem,
  activeIndex,
  onclick,
  children,
  className,
}: Props) => {
  return (
    <div className={`${styles.container} ${className}`}>
      {itemList?.map((item, index) => (
        <IconButton
          key={item}
          title={item}
          onClick={onclick}
          className={`${styles.item} ${
            (item === activeItem || index === activeIndex) && styles.activeItem
          }`}
        />
      ))}
      {children}
    </div>
  );
};
