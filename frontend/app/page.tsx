'use client';

import { RatingScreen } from '$lib/pages/rating/RatingScreen';

const videos = [
  ['Hurdles_crf_0_120fps_FFVHuff_444p10le.avi', 'video12', 'video13', 'video14', 'video15'],
  ['video21', 'video22', 'video23', 'video24', 'video25'],
];

export default function Home() {
  return <RatingScreen videos={videos} />;
}
