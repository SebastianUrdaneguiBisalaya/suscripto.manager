import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type User = {
  user_id: string;
  user_email: string;
  user_name: string;
  user_avatar: string;
};

type UserStore = {
  user: User | null;
  setUser: (user: User | null) => void;
  resetUser: () => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null as User | null,
      setUser: (user: User | null) => set({ user }),
      resetUser: () => set({ user: null }),
    }),
    {
      name: "user-suscripto",
      storage: createJSONStorage(() => {
        if (typeof window !== "undefined") {
          return localStorage;
        }
        // Storage temporal para el servidor
        return {
          getItem: () => null,
          setItem: () => null,
          removeItem: () => null,
        };
      }),
    }
  )
);