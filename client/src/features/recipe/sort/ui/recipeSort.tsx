import { RiCheckLine } from "@react-icons/all-files/ri/RiCheckLine";
import { RiArrowUpDownLine } from "@react-icons/all-files/ri/RiArrowUpDownLine";

import { useModal } from "shared/hooks/useModal";
import { IconButton } from "shared/ui/iconButton";
import { FadeLayout } from "shared/ui/fadeLayout";
import { SORT, useRecipeSortParams } from "..";

import styles from "./recipeSort.module.scss";

export const RecipeSort = () => {
  const { isOpen, toggleModal } = useModal();

  const { sortParams, onClickSetSortParams } = useRecipeSortParams();

  return (
    <div className={styles.sortBar}>
      <IconButton Icon={RiArrowUpDownLine} onClick={toggleModal}>
        정렬
      </IconButton>
      {isOpen && (
        <FadeLayout>
          <nav className={styles.sortContent}>
            {Object.entries(SORT).map(([text, value]) => (
              <IconButton
                key={text}
                value={value}
                Icon={sortParams === text ? RiCheckLine : undefined}
                onClick={onClickSetSortParams}
              >
                {text}
              </IconButton>
            ))}
          </nav>
        </FadeLayout>
      )}
    </div>
  );
};
