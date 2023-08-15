// react imports
import Layout from "@/componenets/common/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

// context provider
import { AuthContextProvider } from "../../context/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  );
}
