import { type ICookingStep } from "shared/api/recipe/type";
import { IconButton } from "shared/ui/iconButton";
import { SubjectBox } from "shared/ui/subjectBox";
import { useHandleStepSlide } from "../..";

import styles from "./recipeStep.module.scss";

interface Props {
  recipeSteps: ICookingStep[];
}

export const RecipeStep = ({ recipeSteps }: Props) => {
  const {
    ref,
    curStep,
    changeStepByIndicator,
    changeStpeByNextButton,
    changeStpeByPrevButton,
  } = useHandleStepSlide(recipeSteps.length);

  return (
    <SubjectBox title="레시피" className={styles.container}>
      <ul className={styles.indicatorContainer}>
        {Array.from({ length: recipeSteps.length }).map((_, i) => (
          <li key={i}>
            <button
              className={`${styles.dotIndicator} ${
                curStep === i && styles.activeDotIndicator
              }`}
              data-index={i}
              onClick={changeStepByIndicator}
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
          onClick={changeStpeByPrevButton}
        >
          이전
        </IconButton>
        <IconButton className="main-button" onClick={changeStpeByNextButton}>
          다음
        </IconButton>
      </div>
    </SubjectBox>
  );
};
