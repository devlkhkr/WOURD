import "styles/globals.scss";
import type { AppProps } from "next/app";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import Head from "next/head";
import Header from "pages/components/Header";
import Footer from "pages/components/Footer";
import Loading from "pages/components/atoms/Loading";
import Login from "pages/components/templates/Login";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { Provider } from "react-redux";
import store from "redux/store";
import { useSelector } from "react-redux";

import { ModalData, setModalData } from "redux/slices/modal";
import { ReducerType } from "redux/rootReducer";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f3f3f3;
  overflow: hidden;
`;

const Wrap = styled.div`
  max-width: 720px;
  min-width: 360px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ComponentWrap = styled.div<any>`
  height: calc(100% - var(--height-header) - var(--height-footer));
  padding: 20px;
  overflow-y: auto;
  overflow-x: hidden;
  &.isMain {
    overflow: hidden;
    touch-action: none;
  }
`;

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loadingStart, setLoadingStart] = useState(false);
  const [isTokenLive, setIsTokenLive] = useState(false);

  useEffect(() => {
    const routesLoadStart = () => {
      setLoadingStart(true);
    };
    const routesLoadEnd = () => {
      setLoadingStart(false);
    };

    router.events.on("routeChangeStart", routesLoadStart);
    router.events.on("routeChangeComplete", routesLoadEnd);
    router.events.on("routeChangeError", routesLoadEnd);

    return () => {
      router.events.off("routeChangeStart", routesLoadStart);
      router.events.off("routeChangeComplete", routesLoadEnd);
      router.events.off("routeChangeError", routesLoadEnd);
    };
  }, []);

  // modal
  // const modalData = useSelector<ReducerType, ModalData[]>(state => state.modal);

  return (
    <>
      <Head>
        <title>Copublish IT Dictionary</title>
        <meta name="description" content="Generated by create next app" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        ></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider store={store}>
        {/* body */}
        {loadingStart ? <Loading /> : <></>}
        {!isTokenLive ? (
          <Login setIsTokenLive={setIsTokenLive} />
        ) : (
          <Wrapper>
            {/* modal */}

            <Wrap>
              <Header />
              {/* content */}
              <ComponentWrap className={router.pathname == "/" ? "isMain" : {}}>
                <Component {...pageProps} />
              </ComponentWrap>

              <Footer />
            </Wrap>
          </Wrapper>
        )}
      </Provider>
    </>
  );
}

export default MyApp;
