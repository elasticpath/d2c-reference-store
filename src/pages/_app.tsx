import MainLayout from "../layouts/main-layout/MainLayout";
import StoreProvider from "../context/store";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import theme from "../styles/theme";
import "focus-visible/dist/focus-visible";

import "../components/checkout/CardSectionStyles.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <StoreProvider>
        <MainLayout nav={pageProps.nav}>
          <Component {...pageProps} />
        </MainLayout>
      </StoreProvider>
    </ChakraProvider>
  );
}

export default MyApp;
