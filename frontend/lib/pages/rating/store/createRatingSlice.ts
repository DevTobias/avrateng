import { StateCreator } from 'zustand';

import { replaceInMatrix } from '$lib/utils/array';

export interface RatingSliceState {
  videos: string[][];
  currentImageSet: number;
  ratings: number[][];
  movedSliders: boolean[][];
  userID?: string;
  hasCompletedTraining: boolean;
}

export interface RatingSlice extends RatingSliceState {
  changeCurrentImageSet: (change: number) => void;
  setRating: (position: number, value: string) => void;
  setUserID: (userID: string) => void;
  setCompletedTraining: () => void;
  isFirstSet: () => boolean;
  isLastSet: () => boolean;
  hasEverySliderMoved: () => boolean;
}

const getInitialState = (init: Partial<RatingSliceState>) => {
  const ratings = init?.videos
    ? init.videos.map((videoSet) => {
        return Array.from({ length: videoSet.length }, () => 50);
      })
    : [];

  const movedSliders = init?.videos
    ? init.videos.map((videoSet) => {
        return Array.from({ length: videoSet.length }, () => false);
      })
    : [];

  return { ratings, movedSliders, videos: [], currentImageSet: 0, hasCompletedTraining: false, ...init };
};

export const createRatingSlice = (init?: Partial<RatingSliceState>): StateCreator<RatingSlice> => {
  return (set, get) => ({
    ...getInitialState(init ?? {}),
    isFirstSet: () => get().currentImageSet === 0,
    isLastSet: () => get().currentImageSet === get().videos.length - 1,
    hasEverySliderMoved: () => get().movedSliders[get().currentImageSet].every((element) => element),
    setCompletedTraining: () => set(() => ({ hasCompletedTraining: true })),
    changeCurrentImageSet: (change) =>
      set((s) => {
        const newImageSet = s.currentImageSet + change;
        if (newImageSet < 0) return { currentImageSet: 0 };
        if (newImageSet > s.videos.length - 1) return { currentImageSet: s.videos.length - 1 };
        return { currentImageSet: newImageSet };
      }),
    setUserID: (userID) => set(() => ({ userID })),
    setRating: (position, value) =>
      set(({ currentImageSet, ratings, movedSliders }) => ({
        ratings: replaceInMatrix(ratings, currentImageSet, position, parseInt(value, 10)),
        movedSliders: replaceInMatrix(movedSliders, currentImageSet, position, true),
      })),
  });
};
