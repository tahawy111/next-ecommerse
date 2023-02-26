import "@/styles/globals.css";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { store } from "../store";
import { Provider } from "react-redux";
import Loading from "@/components/Loading";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Loading />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
