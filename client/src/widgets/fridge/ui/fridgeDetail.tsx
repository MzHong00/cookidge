import { CgAddR } from "@react-icons/all-files/cg/CgAddR";
import { CgRemoveR } from "@react-icons/all-files/cg/CgRemoveR";
import { RiTimer2Line } from "@react-icons/all-files/ri/RiTimer2Line";
import { RiSeedlingLine } from "@react-icons/all-files/ri/RiSeedlingLine";

import { IconButton } from "shared/ui/iconButton";
import { SearchBox } from "shared/ui/searchBox";
import { SubjectBox } from "shared/ui/subjectBox";
import { useDialog } from "shared/hooks/useDialog";

import styles from "./fridgeDetail.module.css";
import { IFridge } from "shared/api/fridge";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { FridgeQueries } from "entities/fridge";
import { IngredientForm } from "features/ingredient";

export const FridgeDetail = () => {
  const { id } = useParams();
  const { ref, openDialog, closeDialog } = useDialog();

  const fridgeDetail = useQueryClient().getQueryData([
    FridgeQueries.keys.detail,
    id,
  ]) as IFridge | undefined;

  return (
    <>
      <p>최근 수정: {fridgeDetail?.last_updated.toLocaleString()}</p>
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
          <IconButton Icon={CgRemoveR}>재료 소모</IconButton>
        </div>
        <div className={styles.ingredientActions}>
          <SearchBox />
          <select>
            <option value="expired_at">유통기한 순</option>
            <option value="category">카테고리 순</option>
          </select>
        </div>
      </SubjectBox>

      <dialog ref={ref} onClick={(e) => closeDialog(e)}>
        <IngredientForm />
      </dialog>
    </>
  );
};
