import "../styles/globals.css";
import "pure-react-carousel/dist/react-carousel.es.css";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
