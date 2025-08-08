import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import zustandStorage from './storage';

type User = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
};

type AuthStore = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: 'auth-storage',
      storage: zustandStorage,
    }
  )
);
