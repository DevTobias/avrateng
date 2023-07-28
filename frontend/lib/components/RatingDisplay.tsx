import { FC, HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  value: number;
  className?: string;
}

export const RatingDisplay: FC<Props> = ({ className = '', value }) => {
  return <kbd className={`${className} kbd rotate-[90deg] w-10 h-10`}>{value}</kbd>;
};
