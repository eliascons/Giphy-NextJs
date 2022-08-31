import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { UserContext, LogContext } from "../../context/context.js";
import axios from "axios";
import styles from "../../styles/register.module.css";
import Head from "next/head";

function Register() {
  const { setUser } = useContext(UserContext);
  const { setIslogged } = useContext(LogContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [userCheck, setUserCheck] = useState(true);
  const [passCheck, setPassCheck] = useState(true);
  const [exists, setExists] = useState(false);

  const router = useRouter();

  const register = async (e) => {
    e.preventDefault();

    if (username.length < 5) {
      console.log("Please enter a valid username");
      setUserCheck(false);
      return;
    } else {
      setUserCheck(true);
    }

    if (password.length < 8) {
      console.log("Please enter a valid password");
      setPassCheck(false);
      return;
    } else {
      setPassCheck(true);
    }
    try {
      const registerResponse = await axios.post("/api/auth/register", {
        username: username,
        password: password,
      });
    } catch (error) {
      console.log(error);
      setExists(true);
      return;
    }

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
          <ul>
            {!userCheck ? <li>User must be longer than 5 characters</li> : null}
            {!passCheck ? (
              <li>Password must be longer than 8 characters</li>
            ) : null}
            {exists ? <li>User already exist</li> : null}
          </ul>
        </form>
      </div>
    </div>
  );
}

export default Register;
