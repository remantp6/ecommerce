import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserState {
  username: string | null;
  role: string | null;
  email: string | null;
  setUser: (user: { username: string; role: string; email: string }) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      username: null,
      role: null,
      email: null,
      setUser: (user) => set(() => ({ ...user })),
    }),
    {
      name: "user-session",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
