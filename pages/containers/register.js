import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { UserContext, LogContext } from "../context/userContext.js";
import axios from "axios";
import styles from "../../styles/register.module.css";
import Head from "next/head";

function Register() {
  const { setUser } = useContext(UserContext);
  const { setIslogged } = useContext(LogContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const register = async (e) => {
    e.preventDefault();
    const RegisterResponse = await axios.post("/api/auth/register", {
      username: username,
      password: password,
    });
    const LoginResponse = await axios.post("/api/auth/login", {
      username: username,
      password: password,
    });
    setIslogged(true);
    setUser(username);

    await router.push("/");
  };

  return (
    <div>
      <Head>
        <title>Giphy-App - Register</title>
      </Head>
      <div className={styles.center}>
        <h1>Register</h1>
        <form>
          <div className={styles.txt_field}>
            <input
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></input>
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
          <button
            type="submit"
            onClick={(e) => register(e)}
            className={styles.btn}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
