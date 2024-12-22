import { useEffect, useState } from "react";

export const usePreviewImages = (imageFiles?: FileList | string[]) => {
  const [previewImage, setPreviewImage] = useState<string[]>([]);

  useEffect(() => {
    if (!imageFiles || imageFiles.length === 0) return;

    const previewUrls =
      typeof imageFiles[0] === "string" // `string[]`일 때
        ? (imageFiles as string[])
        : Array.from(imageFiles as FileList | File[]).map((file) =>
            URL.createObjectURL(file)
          );
          
    setPreviewImage(previewUrls);

    return () => {
      previewUrls.forEach((url) => {
        if (!url) return;
        return URL.revokeObjectURL(url);
      });
    };
  }, [imageFiles]);

  return previewImage;
};
