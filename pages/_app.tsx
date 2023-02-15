import "styles/globals.scss";
import type { AppProps } from "next/app";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import Head from "next/head";
import Header from "pages/components/Header";
import Footer from "pages/components/Footer";
import Loading from "pages/components/atoms/Loading";
import Login from "pages/Login";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import wrapper from "redux/store";
import GlobalModal from "pages/components/templates/GlobalModal";

import { Provider } from "react-redux";
import { Session } from "next-auth";
import {
  SessionProvider,
  useSession,
  getSession,
  signIn,
} from "next-auth/react";
import axios from "axios";
import { DefaultSeo } from "next-seo";
import Alert from "./components/atoms/Alert";
import Context from "./components/organisms/Context";

function Auth({ children }: any) {
  const { data: session, status } = useSession();
  // const isUser = !!session?.user;
  const isUser = session ? session.user : null;
  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!isUser) signIn(); // If not authenticated, force log in
  }, [isUser, status]);

  if (isUser) {
    return children;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <Loading />;
}

/* S: default SEO */
// 각 페이지별로 custom SEO 만들기
const DEFAULT_SEO = {
  title: "Wourd",
  description:
    "You can register words by category to manage storage and status. The goal is to broaden the knowledge for everyone by the searching the words registered by others and sharing the words registered by the user.",
  canonical: "https://www.carrotins.com",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: process.env.NEXT_PUBLIC_ORIGIN,
    title: "Wourd",
    site_name: "Wourd",
    images: [
      {
        url: "카카오톡, 페이스북에에 링크 넣으면 올라올 이미지",
        width: 285,
        height: 167,
        alt: "이미지",
      },
    ],
  },
};

/* E: default SEO */

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f6f7f8;
  overflow: hidden;
  &.isLogin {
    background-color: #fff;
  }
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
  }
`;

function MyApp({
  Component,
  pageProps,
  ...rest
}: AppProps<{ session: Session }>) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const router = useRouter();
  const [loadingStart, setLoadingStart] = useState(false);
  const [axiosLoading, setAxiosLoading] = useState(false);

  useEffect(() => {
    // S : Axios 로딩 세팅
    //axios 호출시 인터셉트
    axios.interceptors.request.use(
      function (config) {
        // console.log("axiosConfigUrl:::", config.url);
        if (
          !config.url?.includes("/api/user/word/state") &&
          !config.url?.includes("/api/user/opt")
        ) {
          setAxiosLoading(true);
        }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
    //axios 호출 종료시 인터셉트
    axios.interceptors.response.use(
      function (response) {
        setAxiosLoading(false);
        return response;
      },
      function (error) {
        setAxiosLoading(false);
        return Promise.reject(error);
      }
    );
    // E : Axios 로딩 세팅

    // S : 라우터 로딩 세팅
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
    // E : 라우터 로딩 세팅
  }, []);

  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0"
          />
        </Head>

        {/* SEO */}
        <DefaultSeo {...DEFAULT_SEO} />

        {/* body */}
        {loadingStart || axiosLoading ? <Loading /> : <></>}
        <Wrapper className={router.pathname == "/Login" ? "isLogin" : ""}>
          {/* modal */}
          <Context />
          <Alert />
          <GlobalModal />
          <Wrap>
            {/* content */}
            {Component.defaultProps?.isAuth === true ? (
              <Component {...pageProps} />
            ) : (
              <Auth>
                <Header />
                <ComponentWrap
                  className={router.pathname == "/" ? "isMain" : ""}
                >
                  <Component {...pageProps} />
                </ComponentWrap>
                <Footer />
              </Auth>
            )}
          </Wrap>
        </Wrapper>
        {/* )} */}
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
