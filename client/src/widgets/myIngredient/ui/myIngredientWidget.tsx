import { useMemo, useState } from "react";

import { CgAddR } from "@react-icons/all-files/cg/CgAddR";
import { RiCloseLine } from "@react-icons/all-files/ri/RiCloseLine";
import { RiEditBoxLine } from "@react-icons/all-files/ri/RiEditBoxLine";

import { IFridge } from "shared/api/fridge";
import { IconButton } from "shared/ui/iconButton";
import { SearchBox } from "shared/ui/searchBox";
import { SubjectBox } from "shared/ui/subjectBox";
import { useDialog } from "shared/hooks/useDialog";
import { IngredientList } from "entities/ingredient";
import { CreateIngredientForm } from "features/ingredient/create";
import { UpdateIngredientForm } from "features/ingredient/update";
import { useFilterIngredients, useSortIngredients } from "..";

import styles from "./myIngredientWidget.module.scss";

const INGREDIENT_SORT_TYPES = ["카테고리", "유통기한"];

interface Props {
  fridge: IFridge;
}

export const MyIngredientWidget = ({ fridge }: Props) => {
  const { ref, openDialog, closeDialog } = useDialog();
  const [isReadMode, setIsReadMode] = useState<boolean>(true);

  const storedIngredients = useMemo(
    () => [...fridge.stored_ingredients],
    [fridge.stored_ingredients]
  );
  const { filterValue, filterResult, onChangeFilterValue } =
    useFilterIngredients(storedIngredients);
  const { sortTypeValue, sortResult, onChangesortTypeValue } =
    useSortIngredients(storedIngredients);

  return (
    <>
      <SubjectBox title={fridge.name} className={styles.ingredientContainer}>
        <div className={styles.ingredientControls}>
          <IconButton
            Icon={CgAddR}
            className="main-button"
            onClick={() => openDialog()}
          >
            재료 추가
          </IconButton>
          <IconButton
            Icon={isReadMode ? RiEditBoxLine : RiCloseLine}
            onClick={() => setIsReadMode((prev) => !prev)}
          >
            {isReadMode ? "재료 수정" : "수정 취소"}
          </IconButton>
        </div>
        <div className={styles.ingredientActions}>
          <SearchBox value={filterValue} onChange={onChangeFilterValue} />
          <select value={sortTypeValue} onChange={onChangesortTypeValue}>
            {INGREDIENT_SORT_TYPES.map((value) => (
              <option key={value} value={value}>
                {value} 순
              </option>
            ))}
          </select>
        </div>

        {isReadMode ? (
          <IngredientList
            stored_ingredients={filterValue ? filterResult : sortResult}
          />
        ) : (
          <UpdateIngredientForm
            fridge_id={fridge._id}
            onSubmitAttach={() => setIsReadMode((prev) => !prev)}
            stored_ingredients={filterValue ? filterResult : sortResult}
          />
        )}
      </SubjectBox>

      <dialog ref={ref} onClick={(e) => closeDialog(e)}>
        <CreateIngredientForm
          fridge_id={fridge._id}
          onSubmitAttach={() => closeDialog()}
        />
      </dialog>
    </>
  );
};
