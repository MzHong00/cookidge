import { useEffect, useState } from "react";

export const usePreviewSteps = (defaultImage: string) => {
  const [previewImage, setPreviewImage] = useState<string>(defaultImage);

  const previewOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return setPreviewImage("");
    setPreviewImage(URL.createObjectURL(file));
  };

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(previewImage);
    };
  }, [previewImage]);

  return { previewImage, previewOnChange };
};
