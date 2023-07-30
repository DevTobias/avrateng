'use client';

import { RatingScreen } from '$lib/pages/rating/RatingScreen';
import { RatingProvider } from '$lib/pages/rating/store/useStore';

const videos = [
  ['Hurdles_crf_0_120fps_FFVHuff_444p10le.avi', 'video12', 'video13', 'video14', 'video15'],
  ['video21', 'video22', 'video23', 'video24', 'video25'],
];

export default function Home() {
  return (
    <RatingProvider videos={videos}>
      <RatingScreen />
    </RatingProvider>
  );
}
