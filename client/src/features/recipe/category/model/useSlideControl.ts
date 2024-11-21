import { useEffect, useRef, useState } from "react";

export const useSlideControl = () => {
  const ref = useRef<HTMLUListElement>(null);
  const [isLeftActive, setIsLeftActive] = useState(false);
  const [isRightActive, setIsRightActive] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const curRef = ref.current;

    const checkScrollPosition = () => {
      const scrollLeft = curRef.scrollLeft;
      const scrollWidth = curRef.scrollWidth;
      const clientWidth = curRef.clientWidth;

      // 왼쪽 끝 (scrollLeft == 0)
      setIsLeftActive(scrollLeft !== 0);

      // 오른쪽 끝 (scrollLeft + clientWidth == scrollWidth)
      setIsRightActive(scrollLeft + clientWidth < scrollWidth);
    };
    curRef.addEventListener("scroll", checkScrollPosition);

    // 최초 렌더링 및 스크롤 이벤트 처리
    checkScrollPosition();
    window.addEventListener("resize", checkScrollPosition);

    return () => {
      window.removeEventListener("resize", checkScrollPosition);
      curRef.removeEventListener("scroll", checkScrollPosition);
    };
  }, [ref]);

  const onClickMoveRight = () => {
    if (ref.current) {
      const scrollAmount = ref.current.clientWidth;
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const onClickMoveLeft = () => {
    if (ref.current) {
      const scrollAmount = ref.current.clientWidth;
      ref.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  return {
    ref,
    isLeftActive,
    isRightActive,
    onClickMoveRight,
    onClickMoveLeft,
  };
};
