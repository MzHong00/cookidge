import { useState } from "react";
import { CloudinaryImage } from "@cloudinary/url-gen";

import { cloudinaryDownload, cloudinaryUpload } from "shared/api/cloudinary/cloudinary";

export const useCloudinaryImage = () => {
    const [image, setImage] = useState<CloudinaryImage>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
  
    const imageLoadHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.currentTarget.files) return;
  
      const file = e.currentTarget.files[0];
      if (!file) return;
  
      setIsLoading(true);
      const uploadResponse = await cloudinaryUpload(file);
      const cloudinaryImage = cloudinaryDownload(uploadResponse?.data.public_id);
  
      setImage(cloudinaryImage);
      setIsLoading(false);
    };
  
    return {
      image: image,
      imageLoadHandler: imageLoadHandler,
      isLoading: isLoading,
    };
  };
  