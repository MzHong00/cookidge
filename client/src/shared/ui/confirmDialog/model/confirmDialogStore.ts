import { create } from "zustand";

interface DialogPayload {
  message: string;
  processMessage: string;
  descriptions: string[];
  requestFn: () => Promise<void>;
  option: {
    backspace?: boolean;
  };
}

interface ConfirmDialog {
  isOpen: boolean;
  isLoading: boolean;
  payload: DialogPayload;
  actions: {
    openDialogMessage: (payload: Partial<DialogPayload>) => void;
    closeDialog: () => void;
    setProcessMessage: (msessage: string) => void;
    setIsLoading: (isLoading: boolean) => void;
  };
}

const initialState = {
  isOpen: false,
  isLoading: false,
  payload: {
    message: "",
    processMessage: "",
    descriptions: [],
    requestFn: async () => {},
    option: {
      backspace: true,
    },
  },
};

export const useConfirmDialogStore = create<ConfirmDialog>()((set) => ({
  ...initialState,
  actions: {
    openDialogMessage: (payload: Partial<DialogPayload>) =>
      set(() => ({
        isOpen: true,
        payload: {
          ...initialState.payload,
          ...payload,
        },
      })),
    closeDialog: () => set(() => ({ ...initialState })),
    setProcessMessage: (message: string) =>
      set((prev) => ({
        payload: { ...prev.payload, processMessage: message },
      })),
    setIsLoading: (isLoading: boolean) => set(() => ({ isLoading })),
  },
}));

export const useConfirmDialogIsLoading = () =>
  useConfirmDialogStore((state) => state.isLoading);

export const useConfirmDialogIsOpen = () =>
  useConfirmDialogStore((state) => state.isOpen);

export const useConfirmDialogPayload = () =>
  useConfirmDialogStore((state) => state.payload);

export const useConfirmDialogActions = () =>
  useConfirmDialogStore((state) => state.actions);
