import { AdvancedImage } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/url-gen";
import { Plugins } from "@cloudinary/html";

import { cloudinaryDownload } from "shared/api/cloudinary";

import styles from "./index.module.css";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  publicId: string;
  cldImg: CloudinaryImage;
  plugins: Plugins;
}

export const CloudinaryImageBox = ({
  publicId,
  cldImg,
  plugins,
  children,
  className,
  ...props
}: Partial<Props>) => {
  const downloadImage = cloudinaryDownload(publicId);

  const image = cldImg || downloadImage;

  if (!image) return null;

  return (
    <AdvancedImage
      cldImg={image}
      plugins={plugins}
      className={`${styles.image} ${className}`}
      {...props}
    />
  );
};
