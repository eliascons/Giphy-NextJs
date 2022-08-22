import Link from "next/link";
import styles from "../styles/Nav.module.css";
import { UserContext, LogContext } from "../pages/context/userContext.js";
import { useContext } from "react";

function Nav() {
  const { isLogged } = useContext(LogContext);
  const { user } = useContext(UserContext);

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
      <div className={styles.links}>
        {!isLogged ? (
          <Link href="/containers/login">
            <a className={styles.links}>Login</a>
          </Link>
        ) : (
          <div>{user}</div>
        )}
      </div>
    </div>
  );
}

export default Nav;
