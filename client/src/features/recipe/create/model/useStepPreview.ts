import { useEffect, useState } from "react";
import { ICookingStep } from "shared/api/recipe/type";

export const usePreviewStepPicture = (cookingStep?: ICookingStep[]) => {
  const [stepPictures, setStepPictures] = useState<{
    [key: string]: string | undefined;
  }>({
    ...cookingStep?.reduce((prev, cur, curIdx) => ({
      ...prev,
      [`cooking_steps.${curIdx}.picture`]: cur.picture
    }), {})
  });

  
  const onChangeStepPreviewPicture = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    const fileUrl = file ? URL.createObjectURL(file) : undefined;

    setStepPictures((prev) => ({ ...prev, [e.target.name]: fileUrl }));
  };

  useEffect(() => {
    return () => {
      console.log("bye");
      
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
