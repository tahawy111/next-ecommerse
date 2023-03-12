import "@/styles/globals.css";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";
// Others
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { store } from "../store";
import { Provider } from "react-redux";
import Loading from "@/components/Loading";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChakraProvider } from "@chakra-ui/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Loading />

        <Layout>
          <ToastContainer
            transition={Flip}
            position="bottom-right"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable={false}
            pauseOnHover
            theme="dark"
          />
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </Provider>
  );
}
