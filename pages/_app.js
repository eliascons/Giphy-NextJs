import Nav from "../components/Nav.js";
import { UserContext, LogContext } from "./context/userContext.js";
import { useState } from "react";
import "../styles/global.css";

export default function App({ Component, pageProps }) {

  const [user, setUser] = useState('');
  const [isLogged, setIslogged] = useState(false);

  return (
    <LogContext.Provider value={{isLogged, setIslogged}}>
    <UserContext.Provider value={{user, setUser}}>
      <Nav />
      <Component {...pageProps} />
    </UserContext.Provider>
    </LogContext.Provider>
  );
}
