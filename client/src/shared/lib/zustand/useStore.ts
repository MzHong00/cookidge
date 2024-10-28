import { create } from "zustand";
import { devtools } from "zustand/middleware";

import {
  createUserSlice,
  UserSlice,
} from "features/user/login/store/userSlice";

// ...a 는 create의 set get 모두 전달
export const useGlobalStore = create<UserSlice>()(
  devtools(
    (...args) => ({
      ...createUserSlice(...args),
    }),
    { name: "global-store" }
  )
);
