import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { shallow } from 'zustand/shallow';

import { useUserStore } from '$lib/store/useUserStore';

export const FinishScreen = () => {
  const { reset } = useUserStore((s) => ({ reset: s.reset }), shallow);
  const router = useRouter();

  useEffect(() => {
    reset();
    localStorage.removeItem('rating-store');
    localStorage.removeItem('user-store');
  }, [reset]);

  return (
    <section className='flex flex-col gap-5 items-center'>
      <h1 className='text-4xl font-bold'>You&apos;re done</h1>
      <p className='text-lg'>Thank you for participating!</p>
      <button className='btn btn-primary' onClick={() => router.push('/')}>
        Restart
      </button>
    </section>
  );
};
