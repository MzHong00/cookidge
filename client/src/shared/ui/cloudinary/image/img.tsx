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
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center",
      }}
    />
  ) : null;
};
