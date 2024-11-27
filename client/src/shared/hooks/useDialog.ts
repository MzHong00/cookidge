import { useRef, type MouseEvent } from "react";

export const useDialog = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openDialog = () => dialogRef.current?.showModal();
  const closeDialog = (e?: MouseEvent<HTMLElement>) =>{
    if(!e) return dialogRef.current?.close();
    
    e.target === e.currentTarget && dialogRef.current?.close();
  }

  return {
    ref: dialogRef,
    openDialog: openDialog,
    closeDialog: closeDialog
  }
};
