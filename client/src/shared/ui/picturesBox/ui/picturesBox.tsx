import { RiArrowDropLeftLine } from "@react-icons/all-files/ri/RiArrowDropLeftLine";
import { RiArrowDropRightLine } from "@react-icons/all-files/ri/RiArrowDropRightLine";

import { IRecipe } from "shared/api/recipe";
import { IconButton } from "shared/ui/iconButton";
import { usePictureSlide } from "../model/usePictureSlide";

import styles from "./picturesBox.module.scss";
import { CldImg } from "shared/ui/cloudinaryImage/cloudinaryImage";

interface Props extends React.HTMLAttributes<HTMLUListElement> {
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

  if (pictures.length < 1)
    return (
      <div className={styles.emptyPictureContainer}>
        <div className={styles.emptyPicture}>사진 없음</div>
      </div>
    );

  return (
    <div className={styles.container}>
      <ul
        ref={ref}
        className={`${className} ${styles.pictureContainer}`}
        onScroll={onScrollDetectIndex}
        {...props}
      >
        {pictures.map((picture) => (
          <li key={picture} className={styles.pictureCard}>
            <CldImg cldImg={picture} className={styles.picture} />
          </li>
        ))}
      </ul>
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
