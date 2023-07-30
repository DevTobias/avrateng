import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { shallow } from 'zustand/shallow';

import { useMounted } from '$lib/hooks/useMounted';
import { useUserStore } from '$lib/store/useUserStore';

const placeholderID = '----------';

export const GetStartedScreen = () => {
  const { userID, hasCompletedTraining } = useUserStore(
    (s) => ({ userID: s.userID, hasCompletedTraining: s.hasCompletedTraining }),
    shallow
  );
  const mounted = useMounted();
  const router = useRouter();

  if (mounted && (!userID || !hasCompletedTraining)) router.replace('/');

  useEffect(() => {
    localStorage.removeItem('rating-store');
  });

  return (
    <section className='flex flex-col gap-5 items-center'>
      <h1 className='text-4xl font-bold'>Welcome to the HFR subjective videoquality test</h1>
      <p className='text-lg'>
        You will now be asked for your rating, alright? <span>[ID {mounted ? userID ?? placeholderID : placeholderID}]</span>
      </p>
      <button className='btn btn-primary' disabled={!mounted} onClick={() => router.push('/rating/begin')}>
        Get started
      </button>
    </section>
  );
};
