import { Provider as StyletronProvider } from "styletron-react";
import { styletron } from "../styletron";
import { LightTheme, BaseProvider, styled, DarkTheme } from "baseui";

import "./code.css";

function MyApp({ Component, pageProps }: any) {
  return (
    <StyletronProvider value={styletron}>
      <BaseProvider theme={LightTheme}>
        <Component {...pageProps} />
      </BaseProvider>
    </StyletronProvider>
  );
}

export default MyApp;
