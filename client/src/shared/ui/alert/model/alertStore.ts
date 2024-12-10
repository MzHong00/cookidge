import { create } from "zustand";

export interface AlertTypes {
  message?: string;
  type: "success" | "error";
}

interface AlertStore {
  queue: AlertTypes[];
  actions: {
    alertEnqueue: (alert: AlertTypes) => void;
    alertDequeue: () => void;
  };
}

const useAlertStore = create<AlertStore>()((set) => ({
  queue: [],
  actions: {
    alertEnqueue: (alert) =>
      set(({ queue }) => ({
        queue: [...queue, alert],
      })),
    alertDequeue: () =>
      set(({ queue }) => ({
        queue: queue.slice(1),
      })),
  },
}));

export const useAlertQueue = () => useAlertStore((state) => state.queue);
export const useAlertActions = () => useAlertStore((state) => state.actions);
