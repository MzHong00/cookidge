import { useEffect, useState } from "react";
import { ICookingStepInput } from "shared/api/recipe";

export const usePreviewSteps = (stepState: ICookingStepInput[]) => {
  const [previewImage, setPreviewImage] = useState<string[]>([]);
  // Effect 의존성 배열의 깊은 비교를 하기 위한 diffStep
  // JSON.stringify를 직접 넣으면 경고 메시지 발생하기 때문에 변수로 할당
  const diffStep =  JSON.stringify(stepState.map(step=>step.picture))
  
  useEffect(() => {
    const imageFiles = stepState.map((step) => step.picture);
    const previewUrls = imageFiles.map((file) => {
      if (!file) return "";

      return typeof file === "string" ? file : URL.createObjectURL(file[0]);
    });

    setPreviewImage(previewUrls);

    return () => {
      previewUrls.forEach((url) => {
        if (!url) return;
        return URL.revokeObjectURL(url);
      });
    };
  }, [stepState, diffStep]);

  return previewImage;
};
