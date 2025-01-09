import { forwardRef, memo } from "react";
import { RiUpload2Line } from "@react-icons/all-files/ri/RiUpload2Line";

import { CldImg } from "../cloudinaryImage/cloudinaryImage";

import styles from "./index.module.scss";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  introduction?: string;
  previewUrl?: string;
}

export const InputFile = memo(
  forwardRef<HTMLInputElement, Props>(
    ({ introduction, previewUrl, id, className, ...props }, ref) => {
      return (
        <div className={`${className} ${styles.container}`} {...props}>
          <label htmlFor={id}>
            {previewUrl ? (
              <CldImg cldImg={previewUrl} className={styles.image} />
            ) : (
              <div className={styles.uploadPlaceholder}>
                <RiUpload2Line size={24} />
                {introduction && (
                  <p className={styles.introduction}>
                    {introduction || "이미지 추가"}
                  </p>
                )}
              </div>
            )}
          </label>

          <input id={id} ref={ref} type="file" accept="image/*" {...props} />
        </div>
      );
    }
  )
);
