import Link from "next/link";
import styles from "../styles/Nav.module.css";
import { UserContext, LogContext } from "../pages/context/userContext.js";
import { useContext } from "react";
import { useRouter } from "next/router";

function Nav() {
  const { isLogged, setIslogged } = useContext(LogContext);
  const { user } = useContext(UserContext);

  const router = useRouter();

  const handleLogout = async () => {
    const response = await fetch("http://localhost:3000/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    setIslogged(false);
    await router.push("/");
  };

  const handleLogin = async () => {
    await router.replace("http://localhost:3000/containers/login");
  };

  return (
    <div className={styles.body}>
      <Link href="/">
        <a className={styles.links}>Home</a>
      </Link>
      <Link href="/containers/search">
        <a className={styles.links}>Search</a>
      </Link>
      <Link href="/containers/saved">
        <a className={styles.links}>Saved</a>
      </Link>

      <Link href="/containers/register">
        <a className={styles.links}>Register</a>
      </Link>
     
        <div className={styles.alignRight}>
          {!isLogged ? (
            <button onClick={handleLogin} className={styles.btn}>Login</button>
          ) : (
            <button onClick={handleLogout} className={styles.btn}>{user}</button>
          )}
        </div>
  
    </div>
  );
}

export default Nav;
