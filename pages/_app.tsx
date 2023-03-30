import "@/styles/globals.css";


// Others
import type { AppProps } from "next/app";
import { store } from "../store";
import { Provider } from "react-redux";
import Loading from "@/components/Loading";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Loading />

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
    </Provider>
  );
}
