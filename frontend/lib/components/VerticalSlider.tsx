import { FC, InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const VerticalSlider: FC<Props> = ({ className = '', ...rest }) => {
  return <input type='range' min={0} max={100} className={`${className} range range-accent`} {...rest} />;
};
