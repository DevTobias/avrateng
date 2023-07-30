import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserState {
  userID?: string;
  hasCompletedTraining: boolean;
}

export interface UserStore extends UserState {
  setUserID: (userID: string) => void;
  setCompletedTraining: () => void;
  reset: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      hasCompletedTraining: false,
      setCompletedTraining: () => set({ hasCompletedTraining: true }),
      setUserID: (userID) => set({ userID }),
      reset: () => set({ hasCompletedTraining: false, userID: undefined }),
    }),
    { name: 'user-store' }
  )
);
