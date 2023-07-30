'use client';

import { RatingProvider } from '$lib/pages/rating/store/useStore';
import { WelcomeScreen } from '$lib/pages/welcome/WelcomeScreen';

export default function Home() {
  return (
    <RatingProvider>
      <WelcomeScreen />
    </RatingProvider>
  );
}
