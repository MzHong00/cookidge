import type { ICookingStep } from "shared/api/recipe/type";
import { IconButton } from "shared/ui/iconButton";
import { SubjectBox } from "shared/ui/subjectBox";
import { useSlide } from "shared/hooks/useSlide";
import { CldImg } from "shared/ui/cloudinaryImage/cloudinaryImage";

import styles from "./recipeStep.module.scss";

interface Props {
  recipeSteps: ICookingStep[];
}

export const RecipeStep = ({ recipeSteps }: Props) => {
 const {
     ref,
     index,
     onClickPrev,
     onClickNext,
     onClickSlideByIndicator,
     onScrollDetectIndex,
   } = useSlide();

  return (
    <SubjectBox title="레시피" className={styles.container}>
      <ul className={styles.indicatorContainer}>
        {Array.from({ length: recipeSteps.length }).map((_, i) => (
          <li key={i}>
            <button
              className={`${index === i && styles.activeIndicator}`}
              data-index={i}
              onClick={onClickSlideByIndicator}
            />
          </li>
        ))}
      </ul>

      <ul ref={ref} onScroll={onScrollDetectIndex} className={styles.stepSlider}>
        {recipeSteps?.map((step, idx) => (
          <li key={step.instruction} className={styles.stepContent}>
            {step.picture && (
              <CldImg
                cldImg={step.picture}
                className={styles.stepImage}
              />
            )}
            <div className={styles.stepInstruction}>
              <b>{idx + 1}</b>
              <p>{step.instruction}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.stepNavigation}>
        <IconButton
          className={styles.stepPrevButton}
          onClick={onClickPrev}
        >
          이전
        </IconButton>
        <IconButton className="main-button" onClick={onClickNext}>
          다음
        </IconButton>
      </div>
    </SubjectBox>
  );
};
