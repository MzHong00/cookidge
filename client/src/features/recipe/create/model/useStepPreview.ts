import { useEffect, useState } from "react";

export const usePreviewStepPicture = () => {
  const [stepPictures, setStepPictures] = useState<{
    [key: string]: string | undefined;
  }>({});

  const onChangeStepPreviewPicture = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    const fileUrl = file ? URL.createObjectURL(file) : undefined;

    setStepPictures((prev) => ({ ...prev, [e.target.name]: fileUrl }));
  };

  useEffect(() => {
    return () => {
      Object.values(stepPictures).forEach((url) => {
        if (url) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [stepPictures]);

  return {
    stepPictures,
    onChangeStepPreviewPicture,
  };
};
