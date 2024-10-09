import { useState, useEffect, useRef, useCallback } from "react";

export const useModal = () => {
  const ref = useRef<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  
  const openModal = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleModal = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(prev => !prev);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.addEventListener("click", handleClickOutside);
    };
  }, [closeModal]);

  return {
    ref,
    isOpen,
    openModal,
    closeModal,
    toggleModal
  };
};
