import { User } from "shared/types";
import { StateCreator } from "zustand";

export interface UserSlice {
  user?: User;
  setUser: (user: User) => void;
}

export const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = (
  set
) => ({
  user: undefined,
  setUser: (user: User) => set(() => ({ user: user })),
});
