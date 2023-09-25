/**
 * If anything is wrong with mui ssr. Please take a look at official demo first:
 * https://github.com/mui-org/material-ui/blob/master/examples/nextjs/pages/_app.js
 *
 * @TODO refactor to share ssr logic for mui and styled-components when next time someone want to copy this
 *
 */

import type { FC } from 'react';
import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';


const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
      <>
          <Head>
              <meta charSet="utf-8" key="charSet" />
              <meta name="viewport" content="width=device-width, initial-scale=1" key="viewport" />
          </Head>
          <Component {...pageProps} />
      </>
  );
};

export default App;
