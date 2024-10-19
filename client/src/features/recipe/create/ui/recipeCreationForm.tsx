import { useState } from "react";

import { RiTimer2Line } from "@react-icons/all-files/ri/RiTimer2Line";
import { RiGroupLine } from "@react-icons/all-files/ri/RiGroupLine";
import { CgAddR } from "@react-icons/all-files/cg/CgAddR";
import { CgRemoveR } from "@react-icons/all-files/cg/CgRemoveR";

import { SubjectBox } from "shared/ui/subjectBox";
import { InputBox } from "shared/ui/inputBox";
import { IconButton } from "shared/ui/iconButton";
import { ItemSelectionBox } from "shared/ui/itemSelectionBox";
import { CloduinaryImageUploader } from "shared/ui/cloudinary";

import styles from "./recipeCreationForm.module.css";
import { FramerFadeLayout } from "shared/ui/framerFadeLayout";

const section = ["재료", "조리 과정"] as const;
type SectionType = (typeof section)[number];

export const RecipeCreationForm = () => {
  const [activeSection, setActiveSection] = useState<SectionType>(section[0]);

  const changeSectionHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const section = e.currentTarget.innerText as SectionType;
    setActiveSection(section);
  };

  return (
    <form className={styles.formContainer}>
      <FramerFadeLayout>
        <SubjectBox title="레시피 생성" className={styles.formContent}>
          <div className={styles.uploadImageList}>
            <CloduinaryImageUploader
              id="image"
              introduction="요리 이미지 추가"
              className={styles.uploaderBox}
            />
          </div>
          <InputBox
            id="name"
            label="요리 이름"
            placeholder="요리 이름을 입력하세요."
          />
          <InputBox
            id="introduction"
            label="요리 소개"
            placeholder="요리의 간단한 소개를 작성해주세요."
          />
          <div className={styles.numberInputBox}>
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
              type="number"
            />
          </div>

          <ItemSelectionBox
            itemList={section}
            activeItem={activeSection}
            onclick={changeSectionHandler}
          />
          {activeSection === "재료" ? (
            <FramerFadeLayout
              key="재료"
              className={`${styles.addItemBox} ${styles.ingredientsInputBox}`}
            >
              <InputBox
                id="ingredient-1"
                placeholder="재료 이름을 입력하세요."
              />
              <InputBox id="quantity-1" placeholder="양 ex) 1개, 1큰술, 1컵" />
              <IconButton Icon={CgRemoveR} />
            </FramerFadeLayout>
          ) : (
            <FramerFadeLayout key="과정" className={`${styles.addItemBox}`}>
              <h2>1</h2>
              <div className={styles.stepInputBox}>
                <CloduinaryImageUploader
                  id="step-picture-1"
                  className={styles.uploaderBox}
                  introduction="조리 과정 이미지/GIF 추가"
                />
                <textarea
                  id="step1"
                  placeholder="조리 과정을 설명해주세요."
                  className={styles.stepTextArea}
                />
              </div>
              <IconButton Icon={CgRemoveR} />
            </FramerFadeLayout>
          )}
          <IconButton Icon={CgAddR} className={styles.addItemButton}>
            추가
          </IconButton>
        </SubjectBox>
        <SubjectBox>
          <IconButton className={styles.createRecipeButton}>
            레시피 생성하기
          </IconButton>
        </SubjectBox>
      </FramerFadeLayout>
    </form>
  );
};
