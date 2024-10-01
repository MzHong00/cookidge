import { AdvancedImage } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/url-gen";
import { Plugins } from "@cloudinary/html";

import { cloudinaryDownload } from "shared/api/cloudinary";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  publicId: string;
  cldImg: CloudinaryImage;
  plugins: Plugins;
}

export const CloudinaryImg = ({
  publicId,
  cldImg,
  plugins,
  ...props
}: Partial<Props>) => {
  const downloadImage = cloudinaryDownload(publicId);

  const image = cldImg || downloadImage;

  return image ? (
    <AdvancedImage
      cldImg={image}
      plugins={plugins}
      {...props}
      style={{
        maxWidth: "inherit",
        height: "100%",
        maxHeight: "inherit",
        objectFit: "contain",
        objectPosition: "top",
      }}
    />
  ) : null;
};
