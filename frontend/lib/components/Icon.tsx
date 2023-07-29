import { FC, HTMLAttributes } from 'react';

import { classNames } from '$lib/utils/classNames';

import styles from './Icon.module.scss';

export type IconName = 'play_circle_outline' | 'first_page' | 'last_page';

interface Props extends HTMLAttributes<SVGElement> {
  icon: IconName;
  iconPath?: string;
  className?: string;
}

export const Icon: FC<Props> = ({ icon, iconPath = '/icons/icons.svg', className = '', ...rest }) => {
  return (
    <svg className={classNames(className, styles.icon)} {...rest}>
      <use xlinkHref={`${iconPath}#${icon}`} />
    </svg>
  );
};
