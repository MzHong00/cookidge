import { RiArrowDropLeftLine } from "@react-icons/all-files/ri/RiArrowDropLeftLine";
import { RiArrowDropRightLine } from "@react-icons/all-files/ri/RiArrowDropRightLine";

import { IRecipe } from "shared/api/recipe";
import { IconButton } from "shared/ui/iconButton";
import { usePictureSlide } from "../model/usePictureSlide";

import styles from "./picturesBox.module.scss";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  pictures: IRecipe["pictures"];
  isThumbnaileMode?: boolean;
}

export const PicturesBox = ({
  pictures,
  isThumbnaileMode = false,
  className,
  ...props
}: Props) => {
  const {
    ref,
    index,
    onClickPrev,
    onClickNext,
    onClickSlideByIndicator,
    onScrollDetectIndex,
  } = usePictureSlide();

  return (
    <div className={styles.container}>
      <div
        ref={ref}
        className={`${className} ${styles.pictureContainer}`}
        onScroll={onScrollDetectIndex}
        {...props}
      >
        {pictures.map((picture) => (
          <div key={picture} className={styles.pictureCard}>
            <img src={picture} alt="" className={styles.picture} />
          </div>
        ))}
      </div>
      {!isThumbnaileMode && pictures.length > 1 && (
        <nav className={styles.indicatorContainer}>
          <IconButton
            Icon={RiArrowDropLeftLine}
            className={styles.moveButton}
            onClick={onClickPrev}
          />
          <div className={styles.indicatorBox}>
            {pictures.map((_, i) => (
              <button
                key={i}
                className={`${styles.indicator} ${
                  index === i && styles.activeIndicator
                }`}
                onClick={onClickSlideByIndicator}
                data-index={i}
              />
            ))}
          </div>
          <IconButton
            Icon={RiArrowDropRightLine}
            className={styles.moveButton}
            onClick={onClickNext}
          />
        </nav>
      )}
    </div>
  );
};
