import { useEffect, useRef } from "react";
import {
  useConfirmDialogActions,
  useConfirmDialogIsLoading,
  useConfirmDialogIsOpen,
} from "..";

export const useHandleShowingDialog = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const isOpen = useConfirmDialogIsOpen();
  const isLoading = useConfirmDialogIsLoading();
  const { closeDialog } = useConfirmDialogActions();

  useEffect(() => {
    const element = dialogRef.current;
    if (!element) return;

    element.showModal();

    const handleClickOutside = (e: MouseEvent) => {
      if(isLoading) return;
      if (e.target === e.currentTarget) closeDialog();
    };

    element.addEventListener("click", handleClickOutside);

    return () => {
      element.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, isLoading, closeDialog]);

  return { ref: dialogRef };
};
