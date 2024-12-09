import { create } from "zustand";

interface AuthStore {
  isLogin: boolean;
  changeIsLogin: (isLogin: boolean) => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  isLogin: true,
  changeIsLogin: (isLogin: boolean) => set(() => ({ isLogin: isLogin })),
}));
