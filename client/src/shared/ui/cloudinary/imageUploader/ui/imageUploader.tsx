import { forwardRef } from "react";
import { AdvancedImage } from "@cloudinary/react";
import { GrDocumentUpload } from "@react-icons/all-files/gr/GrDocumentUpload";

import { useCloudinaryImage } from "../model/imageUploader";

import styles from "./imageUploader.module.scss";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  introduction?: string;
  defaultImgSrc?: string;
}

export const CloduinaryImageUploader = forwardRef<HTMLInputElement, Props>(
  (
    {
      introduction,
      defaultImgSrc,
      id,
      name = "imageFile",
      children,
      className,
      ...props
    },
    ref
  ) => {
    const { image, imageLoadHandler } = useCloudinaryImage();

    return (
      <div className={`${styles.container} ${className}`}>
        <label htmlFor={name} className={styles.fileInput}>
          {image ? (
            <div className={styles.imageBox}>
              <AdvancedImage cldImg={image} />
              <input
                type="hidden"
                name={name}
                value={(image as any).publicID}
              />
            </div>
          ) : (
            <div className={styles.uploadIconBox}>
              {defaultImgSrc ? (
                <img src={defaultImgSrc} alt="" style={{ width: "100%" }} />
              ) : (
                <GrDocumentUpload size={24} />
              )}
              {introduction && (
                <p className={styles.introduction} title={introduction}>
                  {introduction}
                </p>
              )}
            </div>
          )}
        </label>
        {children}
        <input
          ref={ref}
          type="file"
          id={name}
          name={name}
          accept="image/*"
          onChange={imageLoadHandler}
          style={{ display: "none" }}
          {...props}
        />
      </div>
    );
  }
);
