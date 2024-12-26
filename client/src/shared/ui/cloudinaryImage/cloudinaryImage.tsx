import { Plugins } from "@cloudinary/html";
import { AdvancedImage } from "@cloudinary/react";

import cloudinary from "shared/lib/cloudinary";

interface Props extends React.HTMLAttributes<HTMLImageElement> {
  cldImg: string;
  plugins?: Plugins;
}

export const CldImg = ({ cldImg, plugins, ...props }: Props) => {
  const isPublicId = cldImg?.slice(0, 8) === "cookidge";

  if (!isPublicId) return <img src={cldImg} alt="" {...props} />;

  return (
    <AdvancedImage
      cldImg={cloudinary.image(cldImg).format("auto")}
      plugins={plugins}
      {...props}
    />
  );
};
