import { AdvancedImage } from "@cloudinary/react";
import { GrDocumentUpload } from "@react-icons/all-files/gr/GrDocumentUpload";

import { useCloudinaryImage } from "../model/imageUploader";

import styles from "./imageUploader.module.css";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export const CloduinaryImageUploader = ({ id, name, className, ...props }: Props) => {
  const { image, imageLoadHandler } = useCloudinaryImage();

  return (
    <fieldset>
      <label htmlFor={id} className={`${styles.fileInput} ${className}`}>
        {image ? (
          <div className={styles.imageBox}>
            <AdvancedImage cldImg={image} />
            <input type="hidden" name={name} value={(image as any).publicID} />
          </div>
        ) : (
          <GrDocumentUpload size={24} />
        )}
      </label>
      <input
        type="file"
        id={id}
        name="imageFile"
        accept="image/*"
        onChange={imageLoadHandler}
        style={{ display: "none" }}
        {...props}
      />
    </fieldset>
  );
};
