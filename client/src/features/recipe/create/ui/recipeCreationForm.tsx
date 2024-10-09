import { RiTimer2Line } from "@react-icons/all-files/ri/RiTimer2Line";
import { RiGroupLine } from "@react-icons/all-files/ri/RiGroupLine";

import { CloduinaryImageUploader } from "shared/ui/cloudinary";
import { SubjectBox } from "shared/ui/subjectBox";
import { InputBox } from "shared/ui/inputBox";
import { ItemSelectionBox } from "shared/ui/itemSelectionBox";

import styles from "./recipeCreationForm.module.css";

export const RecipeCreationForm = () => {
  return (
    <SubjectBox title="레시피 생성">
      <form>
        <label htmlFor="image">요리 이미지</label>
        <CloduinaryImageUploader id="image" introduction="이미지 추가"/>
        <InputBox
          id="name"
          label="요리 이름"
          placeholder="요리 이름을 입력하세요."
        />
        <InputBox
          id="introduction"
          label="요리 이름"
          placeholder="요리 이름을 입력하세요."
        />
        <div>
          <InputBox
            Icon={RiTimer2Line}
            id="cooking_time"
            label="조리 시간(분)"
            type="number"
          />
          <InputBox
            Icon={RiGroupLine}
            id="servings"
            label="인분"
            placeholder="5"
            type="number"
          />
        </div>
        <ItemSelectionBox itemList={["재료", "조리 과정"]} activeIndex={0} />
      </form>
    </SubjectBox>
  );
};
