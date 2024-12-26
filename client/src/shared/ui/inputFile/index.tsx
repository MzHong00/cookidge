import { forwardRef } from "react";
import { RiUpload2Line } from "@react-icons/all-files/ri/RiUpload2Line";

import { CldImg } from "../cloudinaryImage/cloudinaryImage";

import styles from "./index.module.scss";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  introduction?: string;
  previewUrl?: string;
  file?: File;
}

export const InputFile = forwardRef<HTMLInputElement, Props>(
  (
    { introduction, previewUrl, file, id, className, style, color, ...props },
    ref
  ) => {
    return (
      <div className={`${className} ${styles.container}`} style={style}>
        <label htmlFor={id} className={styles.label}>
          {previewUrl ? (
            <CldImg cldImg={previewUrl} className={styles.image} />
          ) : (
            <div className={styles.uploadPlaceholder}>
              <RiUpload2Line size={24} color={color} />
              {introduction && (
                <p className={styles.introduction}>
                  {introduction || "이미지 추가"}
                </p>
              )}
            </div>
          )}
        </label>
        
        <input
          id={id}
          ref={ref}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          {...props}
        />
      </div>
    );
  }
);
