import { useEffect, useState } from "react";

export const useImagePreview = (imageFiles: FileList | File[]) => {
  const [imagePreviews, setImagePreviews] = useState<(string | undefined)[]>(
    []
  );

  useEffect(() => {
    if (!imageFiles || imageFiles.length === 0) return;

    const previewUrls = Array.from(imageFiles).map((file) => {
      if (!file) return "";
      return URL.createObjectURL(file);
    });
    setImagePreviews(previewUrls);

    return () => {
      previewUrls.forEach((url) => {
        if (!url) return;
        return URL.revokeObjectURL(url);
      });
    };
  }, [imageFiles]);

  return imagePreviews;
};
