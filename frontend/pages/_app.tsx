import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { makeStore } from '../lib/store';
import '../styles/globals.css';

const store = makeStore();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
