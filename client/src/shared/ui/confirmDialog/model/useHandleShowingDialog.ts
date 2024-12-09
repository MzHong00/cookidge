import { useEffect, useRef } from "react";
import {
  useConfirmDialogActions,
  useConfirmDialogIsOpen,
} from "shared/lib/zustand/confirmDialogStore";

export const useHandleShowingDialog = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const isOpen = useConfirmDialogIsOpen();
  const { closeDialog } = useConfirmDialogActions();

  useEffect(() => {
    const element = dialogRef.current;
    if (!element) return;

    element.showModal();

    const handleClickOutside = (e: MouseEvent) => {
      if (e.target === e.currentTarget) closeDialog();
    };

    element.addEventListener("click", handleClickOutside);

    return () => {
      element.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, closeDialog]);

  return { ref: dialogRef };
};
