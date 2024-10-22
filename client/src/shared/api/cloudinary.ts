import axios from "axios";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { Cloudinary } from "@cloudinary/url-gen";
import { center } from "@cloudinary/url-gen/qualifiers/textAlignment";

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


interface ClodinaryProps {
  publicID: string;
  height: number;
}

export const cloudinaryDownload = ({
  publicID,
  height = 200,
}: Partial<ClodinaryProps>) => {
  if (!publicID) return;

  try {
    const cld = new Cloudinary({ cloud: { cloudName: "db0ls9b6a" } });

    const img = cld
      .image(publicID)
      .format("auto")
      .quality("auto")
      .resize(auto().gravity(center()).height(height));

    return img;
  } catch (error) {
    throw new Error("cloudinary download error");
  }
};

// export const useCloudinaryDownload = (publicID?: string) => {
//   return useQuery<CloudinaryImage | undefined>({
//     queryKey: ["cloudinaryImage", publicID],
//     queryFn: () => cloudinaryDownload(publicID),
//     staleTime: 10800,
//     enabled: !!publicID,
//   });
// };
