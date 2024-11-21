import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { UserSlice, userSlice } from "features/user/login";

// ...a 는 create의 set get 모두 전달
export const useGlobalStore = create<UserSlice>()(
  devtools(
    (...args) => ({
      ...userSlice(...args)
    }),
    { name: "global-store" }
  )
);
