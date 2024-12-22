import { useEffect, useRef, useState } from "react";

export const useHandleStepSlide = (length: number) => {
  const ref = useRef<HTMLDivElement>(null);
  const [curStep, setCurStep] = useState<number>(0);

  useEffect(() => {
    if (!ref.current) return;
    ref.current?.scrollTo(ref.current.clientWidth * curStep, 0);
  }, [curStep]);

  const changeStepByIndicator = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.dataset.index)
      setCurStep(parseInt(e.currentTarget.dataset.index));
  };

  const changeStpeByPrevButton = () => {
    setCurStep((prev) => (prev <= 0 ? prev : --prev));
  };

  const changeStpeByNextButton = () => {
    setCurStep((prev) => (prev >= length - 1 ? prev : ++prev));
  };

  return {
    ref,
    curStep,
    changeStepByIndicator,
    changeStpeByPrevButton,
    changeStpeByNextButton,
  };
};
