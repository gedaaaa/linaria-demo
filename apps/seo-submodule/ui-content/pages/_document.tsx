/**
 * If anything is wrong with mui ssr. Please take a look at official demo first:
 * https://github.com/mui-org/material-ui/blob/master/examples/nextjs/pages/_document.js
 *
 * @TODO refactor to share ssr logic for mui and styled-components when next time someone want to copy this
 *
 */

import type { ReactElement } from 'react';
import React from 'react';
import type { DocumentContext, DocumentInitialProps } from 'next/document';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet as StyledComponentsServerStyleSheet } from 'styled-components';
export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    // Resolution order
    //
    // On the server:
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. document.getInitialProps
    // 4. app.render
    // 5. page.render
    // 6. document.render
    //
    // On the server with error:
    // 1. document.getInitialProps
    // 2. app.render
    // 3. page.render
    // 4. document.render
    //
    // On the client
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. app.render
    // 4. page.render

    // Render app and page and get the context of the page with collected side effects.
    const scSheet = new StyledComponentsServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => scSheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [
          ...React.Children.toArray(initialProps.styles),
          scSheet.getStyleElement(),
        ],
      };
    } finally {
      scSheet.seal();
    }
  }

  render(): ReactElement {
    return (
      <Html lang="en" id="html">
        <Head>
          {process.env.NEXT_PUBLIC_STAGE !== 'prod' && <meta name="robots" content="noindex" />}
          <meta name="current-tag-version" content={process.env.NEXT_CURRENT_TAG || 'tag-not-found'} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
