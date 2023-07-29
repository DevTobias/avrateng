import { FC, ButtonHTMLAttributes } from 'react';

import { Icon, IconName } from '$lib/components/Icon';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconName;
  className?: string;
}

export const IconButton: FC<Props> = ({ icon, className = '', ...rest }) => {
  return (
    <button className={`${className} btn btn-sm btn-square btn-outline`} {...rest}>
      <Icon icon={icon} />
    </button>
  );
};
