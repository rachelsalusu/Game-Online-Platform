import '../styles/index.css';
import { wrapper } from "../store/store";
import firebase from "../services/firebase";

firebase();

function MyApp({ Component, pageProps }) {
  return (
      <Component {...pageProps} />
  );
}

export default wrapper.withRedux(MyApp)