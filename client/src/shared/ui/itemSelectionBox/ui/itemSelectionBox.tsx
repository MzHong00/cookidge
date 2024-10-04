import { IconButton } from "shared/ui/iconButton";
import styles from "./itemSelectionBox.module.css";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  itemList: string[];
  activeItem: string;
}

export const ItemSelectionBox = ({
  itemList,
  activeItem,
  className,
  ...props
}: Props) => {
  return (
    <div className={`${styles.container} ${className}`} {...props}>
      {itemList.map((item) => (
        <IconButton
          key={item}
          title={item}
          className={`${styles.item} ${
            item === activeItem && styles.activeItem
          }`}
        />
      ))}
    </div>
  );
};
