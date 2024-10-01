import axios from "axios";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { Cloudinary, CloudinaryImage } from "@cloudinary/url-gen";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { useQuery } from "@tanstack/react-query";

export const cloudinaryUpload = async (file: File) => {
  if (!file) return;

  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "pengreen");

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/db0ls9b6a/image/upload`,
      formData,
      { headers: { "content-type": "multipart/form-data" } }
    );

    return response;
  } catch (error) {
    console.log("cloudinary upload error");
  }
};

export const cloudinaryDownload = (publicID?: string) => {
  if (!publicID) return;

  try {
    const cld = new Cloudinary({ cloud: { cloudName: "db0ls9b6a" } });
    
    const img = cld
      .image(publicID)
      .format("auto")
      .quality("50")
      .resize(auto().gravity(autoGravity()).height(300));

    return img;
  } catch (error) {
    throw new Error("cloudinary download error");
  }
};

export const useCloudinaryDownload = (publicID?: string) => {
  return useQuery<CloudinaryImage | undefined>({
    queryKey: ["cloudinaryImage", publicID],
    queryFn: () => cloudinaryDownload(publicID),
    staleTime: 10800,
    enabled: !!publicID,
  });
};
