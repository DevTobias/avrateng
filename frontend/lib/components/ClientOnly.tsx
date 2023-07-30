import { FC, ReactNode, useEffect, useState } from 'react';

interface Props {
  children: ReactNode;
}

export const ClientOnly: FC<Props> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <span />;
  return children;
};
