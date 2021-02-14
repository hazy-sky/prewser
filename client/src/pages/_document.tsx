import Document, { Html, Head, Main, NextScript } from "next/document";
import { Provider as StyletronProvider } from "styletron-react";
import { styletron } from "../styletron";
import { Client, Server } from "styletron-engine-atomic";

class MyDocument extends Document {
  static async getInitialProps(context: any) {
    const renderPage = () =>
      context.renderPage({
        enhanceApp: (App: any) => (props: any) => (
          <StyletronProvider value={styletron}>
            <App {...props} />
          </StyletronProvider>
        ),
      });

    const initialProps = await Document.getInitialProps({
      ...context,
      renderPage,
    });
    const stylesheets = (styletron as any).getStylesheets() || [];
    return { ...initialProps, stylesheets };
  }

  render() {
    return (
      <Html>
        <Head>
          {(this.props as any).stylesheets.map((sheet: any, i: any) => (
            <style
              className="_styletron_hydrate_"
              dangerouslySetInnerHTML={{ __html: sheet.css }}
              media={sheet.attrs.media}
              data-hydrate={sheet.attrs["data-hydrate"]}
              key={i}
            />
          ))}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
