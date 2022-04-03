import type { AppProps } from "next/app";
import * as React from "react";
// import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
// import { CacheProvider } from "@emotion/react";
import theme from "../theme";
// import createEmotionCache from "../src/createEmotionCache";

// Client-side cache, shared for the whole session of the user in the browser
// const clientSideEmotionCache = createEmotionCache();

export default function MyApp({ Component, pageProps }: AppProps) {
  // const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <>
      <Head>
        <title>Reddit Clone</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
