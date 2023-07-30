'use client';

import { RatingScreen } from '$lib/pages/rating/RatingScreen';
import { RatingProvider } from '$lib/pages/rating/store/useStore';

const videos = [['01.mkv', 'video12', 'video13', 'video14', 'video15']];

export default function Training() {
  return (
    <RatingProvider videos={videos}>
      <RatingScreen isTraining />
    </RatingProvider>
  );
}
