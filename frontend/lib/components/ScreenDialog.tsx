import { FC, ReactNode } from 'react';

interface Props {
  open: boolean;
  children: ReactNode;
}

export const ScreenDialog: FC<Props> = ({ children, open }) => {
  return (
    <dialog className={`modal ${open ? 'modal-open' : ''}`}>
      <form
        method='dialog'
        className='modal-box max-w-none max-h-none rounded-none w-screen h-screen flex justify-center items-center'
      >
        <h3 className='font-bold text-lg'>{children}</h3>
      </form>
    </dialog>
  );
};
