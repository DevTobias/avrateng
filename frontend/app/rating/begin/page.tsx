'use client';

import useSWR from 'swr';

import { RatingScreen } from '$lib/pages/rating/RatingScreen';
import { RatingProvider } from '$lib/pages/rating/store/useStore';

export default function Rating() {
  const { data, error, isLoading } = useSWR('/files', () => fetch('/videos').then((res) => res.json()));
  if (error || isLoading) return <span className='loading loading-dots loading-lg'></span>;

  return (
    <RatingProvider videos={data.rating}>
      <RatingScreen />
    </RatingProvider>
  );
}
