import { Provider as StyletronProvider } from "styletron-react";
import { styletron } from "../styletron";
import { LightTheme, BaseProvider, styled, DarkTheme } from "baseui";
import { ConnectedRouter } from "connected-next-router";
import { wrapper } from "./../store";
import "./code.css";

function MyApp({ Component, pageProps }: any) {
  return (
    <StyletronProvider value={styletron}>
      <BaseProvider theme={LightTheme}>
        <ConnectedRouter>
          <Component {...pageProps} />
        </ConnectedRouter>
      </BaseProvider>
    </StyletronProvider>
  );
}

export default wrapper.withRedux(MyApp);
