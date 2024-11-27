import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CgAddR } from "@react-icons/all-files/cg/CgAddR";
import { RiCloseLine } from "@react-icons/all-files/ri/RiCloseLine";
import { RiEditBoxLine } from "@react-icons/all-files/ri/RiEditBoxLine";
import { RiTimer2Line } from "@react-icons/all-files/ri/RiTimer2Line";
import { RiSeedlingLine } from "@react-icons/all-files/ri/RiSeedlingLine";

import { IconButton } from "shared/ui/iconButton";
import { SearchBox } from "shared/ui/searchBox";
import { SubjectBox } from "shared/ui/subjectBox";
import { useDialog } from "shared/hooks/useDialog";
import { FridgeQueries } from "entities/fridge";
import {
  IngredientForm,
  useCreateIngredientMutation,
  useUpdateIngredientMutation,
} from "features/ingredient/mutate";

import styles from "./fridgeDetail.module.css";
import { useState } from "react";

export const FridgeDetail = () => {
  const { id } = useParams();
  const { ref, openDialog, closeDialog } = useDialog();
  const [isReadMode, setIsReadMode] = useState<boolean>(true);

  const { data: fridgeDetail } = useQuery(FridgeQueries.detailQuery(id));
  const { mutate: createIngredientMutation } = useCreateIngredientMutation(id);
  const { mutate: updateIngredientMutation } = useUpdateIngredientMutation(id);

  return (
    <>
      {fridgeDetail?.last_updated && (
        <p className={styles.lastUpdateText}>
          최근 수정: {new Date(fridgeDetail.last_updated).toLocaleString()}
        </p>
      )}
      <div className="flex-row">
        <SubjectBox
          title="재료"
          Icon={RiSeedlingLine}
          headerClassName={styles.headerReverse}
        >
          <h1>{fridgeDetail?.stored_ingredients.length}</h1>
          <p>총 재료 수</p>
        </SubjectBox>
        <SubjectBox
          title="유통기한 임박"
          Icon={RiTimer2Line}
          headerClassName={styles.headerReverse}
        >
          <h1>5</h1>
          <p>3일 이내 유통기한 만료 재료 수</p>
        </SubjectBox>
      </div>

      <SubjectBox
        title="재료 현황"
        className={`${styles.ingredientContainer} flex-column-center`}
      >
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
          <SearchBox />
          <select>
            <option value="expired_at">유통기한 순</option>
            <option value="category">카테고리 순</option>
          </select>
        </div>

        {id && fridgeDetail?.stored_ingredients && (
          <IngredientForm
            mutateFn={updateIngredientMutation}
            onSubmitAttach={() => setIsReadMode((prev) => !prev)}
            stored_ingredients={fridgeDetail.stored_ingredients}
            isReadMode={isReadMode}
          />
        )}
      </SubjectBox>

      <dialog ref={ref} onClick={(e) => closeDialog(e)}>
        {id && (
          <IngredientForm
          mutateFn={createIngredientMutation}
            onSubmitAttach={() => closeDialog()}
            isReadMode={false}
          />
        )}
      </dialog>
    </>
  );
};
