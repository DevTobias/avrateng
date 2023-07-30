import { createStore } from 'zustand';
import { persist } from 'zustand/middleware';

import { RatingSlice, RatingSliceState, createRatingSlice } from '$lib/pages/rating/store/createRatingSlice';
import { createProvider } from '$lib/utils/zustand';

export type State = RatingSliceState;
type Store = RatingSlice;

export const createRatingStore = (init?: Partial<State>) => {
  return createStore<Store>()(
    persist(
      (...props) => ({
        ...createRatingSlice(init)(...props),
      }),
      { name: 'rating-store' }
    )
  );
};

export const {
  Context: RatingContext,
  Provider: RatingProvider,
  useStoreContext: useRatingStore,
} = createProvider<Store>(createRatingStore);
