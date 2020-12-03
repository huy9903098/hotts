import { Box, CSSReset, ThemeProvider } from "@chakra-ui/core";
import React from "react";
import theme from "../theme";


function MyApp({ Component, pageProps }: any) {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Box bg="#e9ece6" minHeight="100vh">
      <Component {...pageProps} />
      </Box>
      
    </ThemeProvider>
  );
}

export default MyApp;
