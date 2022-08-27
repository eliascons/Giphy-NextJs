import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { UserContext, LogContext } from "../context/userContext.js";
import { useContext } from "react";
import styles from "../../styles/login.module.css";

function Login() {
  const { setUser } = useContext(UserContext);
  const { setIslogged } = useContext(LogContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/auth/login", {
        username: username,
        password: password,
      });

      if (res.status === 200) {
        setUser(username);
        setIslogged(true);
        await router.push("/");
      }
    } catch (err) {
      console.log(err);
      console.log("Error invalid username or password");
    }
  };

  return (
    <div className={styles.center}>
      <h1>Login</h1>
      <form>
        <div className={styles.txt_field}>
          <input
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <span></span>
          <label>Username</label>
          
        </div>
        <div className={styles.txt_field}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <span></span>
          <label>Password</label>
        </div>
        <button type="submit" onClick={(e) => login(e)} className={styles.btn}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
