import { useRef, useState } from "react";

import { type CookingStep } from "shared/api/recipe/type";
import { IconButton } from "shared/ui/iconButton";
import { SubjectBox } from "shared/ui/subjectBox";

import styles from "./recipeStep.module.scss";

interface Props {
  recipeSteps?: CookingStep[];
}

export const RecipeStep = ({ recipeSteps }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [curStep, setCurStep] = useState<number>(0);

  const changeStepByButtonHandler = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const target = ref.current;
    if (!target) return;

    let willMoveStep;

    if (e.currentTarget.dataset.index) {
      // 인디케이터로 이동할 때,
      const indicatorIndex = parseInt(e.currentTarget.dataset.index);
      willMoveStep = indicatorIndex;
    } else {
      // 이전, 다음 버튼으로 이동할 때,
      const buttonType = e.currentTarget.innerText;
      const moveDirection = buttonType === "다음" ? 1 : -1;

      willMoveStep = curStep + moveDirection;
    }

    if (willMoveStep < 0 || willMoveStep > target.children.length - 1) return;

    const leftWhiteSpace = target.offsetLeft;
    const willStepOffsetLeft = target.children[willMoveStep] as HTMLDivElement;

    setCurStep(willMoveStep);
    target.scrollTo(willStepOffsetLeft.offsetLeft - leftWhiteSpace, 0);
  };

  return (
    <SubjectBox title="레시피" className={styles.container}>
      <ul className={styles.indicatorContainer}>
        {Array.from({ length: recipeSteps?.length || 0 }).map((_, i) => (
          <li key={i}>
            <button
              className={`${styles.dotIndicator} ${
                curStep === i && styles.activeDotIndicator
              }`}
              data-index={i}
              onClick={changeStepByButtonHandler}
            />
          </li>
        ))}
      </ul>

      <div ref={ref} className={styles.recipeStepSlider}>
        {recipeSteps?.map((step, idx) => (
          <article key={step.instruction} className={styles.recipeStepContent}>
            <img src={step.picture} alt="" className={styles.recipeStepImage} />
            <div className={styles.recipeStepInstruction}>
              <div className={`${styles.recipeStepPointer}`}>{idx + 1}</div>
              <p>{step.instruction}</p>
            </div>
          </article>
        ))}
      </div>

      <div className={styles.stepNavigation}>
        <IconButton
          className={styles.stepPrevButton}
          onClick={changeStepByButtonHandler}
        >
          이전
        </IconButton>
        <IconButton className="main-button" onClick={changeStepByButtonHandler}>
          다음
        </IconButton>
      </div>
    </SubjectBox>
  );
};
