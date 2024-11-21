import { RiCheckLine } from "@react-icons/all-files/ri/RiCheckLine";
import { RiArrowUpDownLine } from "@react-icons/all-files/ri/RiArrowUpDownLine";

import { useModal } from "shared/hooks/useModal";
import { IconButton } from "shared/ui/iconButton";
import { useRecipeSortParams } from "../model/useRecipeSortParams";

import styles from "./recipeSort.module.scss";
import { FramerFadeLayout } from "shared/ui/framerFadeLayout";

export const RecipeSort = () => {
  const { isOpen, toggleModal } = useModal();
  const { sortParams, onClickSort } = useRecipeSortParams();

  return (
    <div className={styles.sortBar}>
      <IconButton Icon={RiArrowUpDownLine} onClick={toggleModal}>
        정렬
      </IconButton>
      {isOpen && (
        <FramerFadeLayout>
          <nav className={styles.sortContent}>
            {["최신순", "좋아요순"].map((value) => (
              <IconButton
                key={value}
                Icon={sortParams === value ? RiCheckLine : undefined}
                onClick={onClickSort}
              >
                {value}
              </IconButton>
            ))}
          </nav>
        </FramerFadeLayout>
      )}
    </div>
  );
};
