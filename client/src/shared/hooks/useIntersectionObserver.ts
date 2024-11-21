import { useCallback, useEffect, useState } from "react";
import { InfiniteQueryObserverResult } from "@tanstack/react-query";

interface IuseIntersectionObserverProps {
  threshold?: number;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => Promise<InfiniteQueryObserverResult>;
}

export const useIntersectionObserver = ({
  threshold = 0,
  hasNextPage,
  fetchNextPage,
}: IuseIntersectionObserverProps) => {
  //관찰할 요소
  const [target, setTarget] = useState<HTMLDivElement | null | undefined>(null);

  const observerCallback: IntersectionObserverCallback = useCallback(
    (entries) => {
      entries.forEach((entry) => {
        //target이 화면에 관찰되고, 다음페이지가 있다면 다음페이지를 호출
        if (entry.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
    },
    [fetchNextPage, hasNextPage]
  );

  useEffect(() => {
    if (!target) return;

    //ointersection observer 인스턴스 생성
    const observer = new IntersectionObserver(observerCallback, {
      threshold,
    });

    // 타겟 관찰 시작
    observer.observe(target);

    // 관찰 멈춤
    return () => observer.disconnect();
  }, [observerCallback, threshold, target]);

  return { setTarget };
};
