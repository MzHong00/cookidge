import { CloudinaryImg } from "../cloudinary";
import { FramerFadeLayout } from "../framerFadeLayout";
import { IconCategoriesByClodinary } from "shared/types";

import styles from "./index.module.scss";

interface Props {
  title: string;
  itemList: IconCategoriesByClodinary[];
  className: string;
  onclickItem: React.MouseEventHandler;
}

export const IconCategoriesBox = ({
  title,
  itemList,
  className,
  onclickItem,
}: Partial<Props>) => {
  return (
    <FramerFadeLayout className={`${className} ${styles.container}`}>
      <b>재료 상자</b>
      <div className={`${styles.itemList}`}>
        {itemList?.map((item) => (
          <button
            key={item.iconId}
            data-value={item.text}
            className={styles.item}
            onClick={onclickItem}
          >
            <CloudinaryImg
              publicId={item.iconId}
              height={42}
              style={{ backgroundColor: "inherit" }}
            />
            <span>{item.text}</span>
          </button>
        ))}
      </div>
    </FramerFadeLayout>
  );
};
