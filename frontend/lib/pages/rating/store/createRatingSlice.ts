import { StateCreator } from 'zustand';

import { replaceInMatrix } from '$lib/utils/array';

export interface RatingSliceState {
  videos: string[][];
  currentImageSet: number;
  ratings: number[][];
  movedSliders: boolean[][];
  playedVideos: boolean[][];
}

export interface RatingSlice extends RatingSliceState {
  changeCurrentImageSet: (change: number) => void;
  setRating: (position: number, value: string) => void;
  setPlayedVideo: (position: number) => void;
  isFirstSet: () => boolean;
  isLastSet: () => boolean;
  everySliderMoved: () => boolean;
  everyVideoPlayed: () => boolean;
}

const initializeVideoVectors = (init: Partial<RatingSliceState>) => {
  const ratings = init?.videos
    ? init.videos.map((videoSet) => {
        return Array.from({ length: videoSet.length }, () => 50);
      })
    : [];

  const booleanArray = init?.videos
    ? init.videos.map((videoSet) => {
        return Array.from({ length: videoSet.length }, () => false);
      })
    : [];

  return { ratings, movedSliders: [...booleanArray], playedVideos: [...booleanArray], ...init };
};

export const createRatingSlice = (init?: Partial<RatingSliceState>): StateCreator<RatingSlice> => {
  return (set, get) => ({
    ...{ currentImageSet: 0, videos: [] },
    ...initializeVideoVectors(init ?? {}),
    isFirstSet: () => get().currentImageSet === 0,
    isLastSet: () => get().currentImageSet === get().videos.length - 1,
    everySliderMoved: () => get().movedSliders[get().currentImageSet].every((element) => element),
    everyVideoPlayed: () => get().playedVideos[get().currentImageSet].every((element) => element),
    changeCurrentImageSet: (change) =>
      set((s) => {
        const newImageSet = s.currentImageSet + change;
        if (newImageSet < 0) return { currentImageSet: 0 };
        if (newImageSet > s.videos.length - 1) return { currentImageSet: s.videos.length - 1 };
        return { currentImageSet: newImageSet };
      }),
    setRating: (position, value) =>
      set(({ currentImageSet, ratings, movedSliders }) => ({
        ratings: replaceInMatrix(ratings, currentImageSet, position, parseInt(value, 10)),
        movedSliders: replaceInMatrix(movedSliders, currentImageSet, position, true),
      })),
    setPlayedVideo: (position) =>
      set(({ currentImageSet, playedVideos }) => ({
        playedVideos: replaceInMatrix(playedVideos, currentImageSet, position, true),
      })),
  });
};
