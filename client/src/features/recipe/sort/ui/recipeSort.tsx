import { RiCheckLine } from "@react-icons/all-files/ri/RiCheckLine";
import { RiArrowUpDownLine } from "@react-icons/all-files/ri/RiArrowUpDownLine";

import { useModal } from "shared/hooks/useModal";
import { IconButton } from "shared/ui/iconButton";
import { FadeLayout } from "shared/ui/fadeLayout";
import { useRecipeSortParams } from "..";

import styles from "./recipeSort.module.scss";

export const RecipeSort = () => {
  const { isOpen, toggleModal } = useModal();
  const { sortParams, onClickSort } = useRecipeSortParams();

  return (
    <div className={styles.sortBar}>
      <IconButton Icon={RiArrowUpDownLine} onClick={toggleModal}>
        정렬
      </IconButton>
      {isOpen && (
        <FadeLayout>
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
        </FadeLayout>
      )}
    </div>
  );
};
