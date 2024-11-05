import { create } from "zustand";
import { devtools } from "zustand/middleware";

// ...a 는 create의 set get 모두 전달
export const useGlobalStore = create()(
  devtools(
    (...args) => ({
    }),
    { name: "global-store" }
  )
);
