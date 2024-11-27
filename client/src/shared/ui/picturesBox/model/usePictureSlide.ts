import { useRef, useState, type MouseEvent } from "react";

export const usePictureSlide = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState<number>(0);

  const onClickPrev = () => {
    const moveDistance = ref.current?.clientWidth;
    ref.current?.scrollBy({ left: -(moveDistance || 0) });
  };

  const onClickNext = () => {
    const moveDistance = ref.current?.clientWidth;
    ref.current?.scrollBy({ left: moveDistance });
  };

  const onClickSlideByIndicator = (e: MouseEvent<HTMLButtonElement>) => {
    const index = e.currentTarget.dataset.index;

    if (!index || !ref.current?.clientWidth) return;

    const moveDistance = ref.current.clientWidth * Number(index);
    ref.current?.scrollTo({ left: moveDistance });
  };

  const onScrollDetectIndex = (e: MouseEvent<HTMLDivElement>) => {
    const leftScroll = e.currentTarget.scrollLeft;
    const clientWidth = ref.current?.clientWidth;

    if (!leftScroll || !clientWidth) return;

    const curIndex = e.currentTarget.scrollLeft / ref.current.clientWidth;
    setIndex(Math.round(curIndex));
  };

  return {
    ref,
    index,
    onClickPrev,
    onClickNext,
    onClickSlideByIndicator,
    onScrollDetectIndex,
  };
};
