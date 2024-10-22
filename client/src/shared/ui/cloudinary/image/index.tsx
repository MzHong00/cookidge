import { AdvancedImage } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/url-gen";
import { Plugins } from "@cloudinary/html";

import { cloudinaryDownload } from "shared/api/cloudinary";

import styles from "./index.module.css";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  publicId: string;
  cldImg: CloudinaryImage;
  plugins: Plugins;
  height: number;
}

export const CloudinaryImg = ({
  publicId,
  cldImg,
  plugins,
  height,
  children,
  className,
  ...props
}: Partial<Props>) => {
  const downloadImage = cloudinaryDownload({
    publicID: publicId,
    height: height,
  });

  const image = cldImg || downloadImage;

  if (!image) return null;

  return (
    <AdvancedImage
      loading="lazy"
      height={height}
      cldImg={image}
      plugins={plugins}
      className={`${styles.image} ${className}`}
      {...props}
    />
  );
};
