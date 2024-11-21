import { StateCreator } from "zustand";

export interface UserSlice {
  isLogin: boolean;
  changeIsLogin: (isLogin: boolean) => void;
}

export const userSlice: StateCreator<UserSlice> = (set) => ({
  isLogin: true,
  changeIsLogin: (isLogin: boolean) => set(() => ({ isLogin: isLogin })),
});
