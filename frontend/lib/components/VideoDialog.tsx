import { FC } from 'react';

interface Props {
  open: boolean;
  video: string | null;
}

export const VideoDialog: FC<Props> = ({ open, video }) => {
  return (
    <dialog id='video_modal' className={`modal ${open ? 'modal-open' : ''}`}>
      <form
        method='dialog'
        className='modal-box max-w-none max-h-none rounded-none w-screen h-screen flex justify-center items-center'
      >
        <h3 className='font-bold text-lg'>{video}</h3>
      </form>
    </dialog>
  );
};
