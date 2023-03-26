import "@/styles/globals.css";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "web3uikit";
import Header from "@/components/HEader";
import { SessionProvider } from "next-auth/react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App({ Component, pageProps, session }) {
  return (
    <MoralisProvider initializeOnMount={false}>
      <NotificationProvider>
        {/* <Header /> */}
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </NotificationProvider>
    </MoralisProvider>
  );
}
