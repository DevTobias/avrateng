import { ReactNode } from 'react';

import '$lib/styles/global.scss';

export const metadata = {
  title: 'Avrateng',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='de'>
      <body className='w-full h-screen flex items-center justify-center'>{children}</body>
    </html>
  );
}
