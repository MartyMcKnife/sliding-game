import "../styles/globals.css";
import type { AppProps } from "next/app";
import WebHead from "../components/WebHead";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <WebHead />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
