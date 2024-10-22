import { RiAddLine } from "@react-icons/all-files/ri/RiAddLine";

import { Ingredient } from "shared/types";
import { InputBox } from "shared/ui/inputBox";
import { IconButton } from "shared/ui/iconButton";
import { SubjectBox } from "shared/ui/subjectBox";
import { ItemSelectionBox } from "shared/ui/itemSelection";
import { INGREDIENTS_CATEGORIES } from "entities/ingredient";
import { IngredientForm } from "features/ingredient";

import styles from "./ingredientCreationBox.module.scss";

interface Props {
  children?: React.ReactNode
}

export const IngredientCreationBox = ({children}:Props) => {
  return (
    <div className={`${styles.container}`}>
      <SubjectBox title="재료 추가">
        <ItemSelectionBox
          itemList={["직접 추가", "영수증 인식", "재료 인식"]}
          activeItem={"직접 추가"}
          className="w-full"
        />
        <fieldset className={styles.ingredientAddBox}>
          <div>
            <label htmlFor="category">카테고리</label>
            <select id="category">
              {INGREDIENTS_CATEGORIES.map((category) => (
                <option key={category.iconId}>{category.text}</option>
              ))}
            </select>
          </div>
          <InputBox label="이름" name="name" />
          <InputBox label="유통기한" type="date" name="expired_at" />
          <InputBox label="수량" name="quantity" />
        </fieldset>
        <IconButton Icon={RiAddLine} className="main-button">
          재료 담기
        </IconButton>
      </SubjectBox>
      <IngredientForm ingredients={[ingredient]} />
      <footer className={styles.actionBar}>
        {children}
        <IconButton className="main-button">재료 추가(5)</IconButton>
      </footer>
    </div>
  );
};

const ingredient: Ingredient = {
  _id: "1",
  name: "감자",
  category: "채소",
  expired_at: new Date(),
  quantity: "150g",
};
