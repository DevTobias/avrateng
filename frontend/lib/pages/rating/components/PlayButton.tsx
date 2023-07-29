import { FC, HTMLAttributes } from 'react';

import { Icon } from '$lib/components/Icon';

interface Props extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const PlayButton: FC<Props> = ({ className = '', ...rest }) => {
  return (
    <button className={`${className} btn p-0 min-h-0 h-10 w-10`} {...rest}>
      <Icon icon='play_circle_outline' className='rotate-[90deg]' />
    </button>
  );
};
