/**
 * @module _app
 * @description Base Next.js _app file
 */

import PropTypes from "prop-types";
import Head from "next/head";
import { Normalize } from "styled-normalize";
import { SWRConfig } from "swr";
import GlobalStyle from "styles/global";
import Layout from "components/layout/Layout";
import LoadingPage from "components/layout/LoadingPage";

export default function App({ Component }) {
  return (
    <>
      <Normalize />
      <GlobalStyle />
      <SWRConfig
        value={{
          refreshInterval: 10000,
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <Head>
          <link rel="icon" href="/ETCH_logo.png" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, viewport-fit=cover"
          />
          <meta name="author" content="Corey White" />
        </Head>
        <Layout>
          <Component />
        </Layout>
      </SWRConfig>
    </>
  );
}

App.propTypes = {
  Component: PropTypes.elementType,
};
