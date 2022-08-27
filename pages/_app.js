import Nav from "../components/Nav.js";
import { UserContext, LogContext } from "./context/userContext.js";
import { useState } from "react";
import "../styles/global.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState("");
  const [isLogged, setIslogged] = useState(false);

  return (
    <div>
      <Head>
        <title>Giphy-App</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>
      <LogContext.Provider value={{ isLogged, setIslogged }}>
        <UserContext.Provider value={{ user, setUser }}>
          <Nav />
          <Component {...pageProps} />
        </UserContext.Provider>
      </LogContext.Provider>
    </div>
  );
}
