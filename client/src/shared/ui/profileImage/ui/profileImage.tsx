import { CldImg } from "shared/ui/cloudinaryImage/cloudinaryImage";

import styles from "./profileImage.module.css";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {}

export const ProfileImage = ({ className, src, alt = "", ...props }: Props) => {
  if (!src)
    return (
      <img
        src={src}
        alt={alt}
        className={`${styles.profile} ${className}`}
        {...props}
      />
    );

  return (
    <CldImg
      cldImg={src}
      className={`${styles.profile} ${className}`}
      {...props}
    />
  );
};
