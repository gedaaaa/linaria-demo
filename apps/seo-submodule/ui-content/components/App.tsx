import type { FC } from 'react';
import React from 'react';
import Head from 'next/head';

import { AppTheme } from './AppTheme';

export const App: FC = ({
  children,
}) => {


  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" />
        {<meta name="robots" content="noindex" />}
      </Head>
      <AppTheme>
        {children}
      </AppTheme>
    </>
  );
};
