import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { shallow } from 'zustand/shallow';

import { useMounted } from '$lib/hooks/useMounted';
import { useUserStore } from '$lib/store/useUserStore';
import { generateSimpleId } from '$lib/utils/random';

export const WelcomeScreen = () => {
  const { setUserID, reset } = useUserStore((s) => ({ setUserID: s.setUserID, reset: s.reset }), shallow);
  const mounted = useMounted();
  const router = useRouter();

  useEffect(() => {
    reset();
    localStorage.removeItem('rating-store');
    localStorage.removeItem('user-store');
  }, [reset]);

  return (
    <section className='flex flex-col gap-5 items-center'>
      <h1 className='text-4xl font-bold'>Welcome to AVRateNG</h1>
      <p className='text-lg'>This is the training stage</p>
      <button
        className='btn btn-primary'
        disabled={!mounted}
        onClick={() => {
          setUserID(generateSimpleId());
          router.push('/training');
        }}
      >
        Start training
      </button>
    </section>
  );
};
