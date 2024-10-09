import { useRef, type ReactNode, type MouseEvent } from "react";

/*
    arg:
    children: dialog에 표시될 내용물
    return:
    [
        JsxElement: children을 감싼 dialog 
        usage) 아무 곳에 <div>{JsxElement}</div>
        openHandler: dialog를 열기 위한 핸들러 함수 
        usage) button 등의 객체 onClick함수에 장착
    ]
*/

export const useDialog = (children: ReactNode): [ReactNode, () => void] => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openHandler = () => dialogRef.current?.showModal();
  const closeHandler = (e: MouseEvent<HTMLElement>) =>
    e.target === e.currentTarget && dialogRef.current?.close();

  const JsxElement = (
    <dialog ref={dialogRef} onClick={closeHandler}>
      {children}
    </dialog>
  );

  return [JsxElement, openHandler];
};
