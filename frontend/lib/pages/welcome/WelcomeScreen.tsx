import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useMounted } from '$lib/hooks/useMounted';
import { useRatingStore } from '$lib/pages/rating/store/useStore';
import { generateSimpleId } from '$lib/utils/random';

const placeholderID = '----------';

export const WelcomeScreen = () => {
  const mounted = useMounted();
  const router = useRouter();
  const { userID, setUserID } = useRatingStore((s) => s);

  useEffect(() => {
    if (!userID) setUserID(generateSimpleId());
  }, [userID, setUserID]);

  return (
    <section className='flex flex-col gap-5 items-center'>
      <h1 className='text-4xl font-bold'>Welcome to AVRateNG</h1>
      <p className='text-lg'>
        This is the training stage <span>[ID {mounted ? userID ?? placeholderID : placeholderID}]</span>
      </p>
      <button className='btn btn-primary' disabled={!mounted} onClick={() => router.push('/training')}>
        Start training
      </button>
    </section>
  );
};
