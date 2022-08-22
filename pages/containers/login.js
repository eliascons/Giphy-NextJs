import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { UserContext, LogContext } from "../context/userContext.js";
import { useContext } from "react";


function Login() {
  const { setUser } = useContext(UserContext);
  const { setIslogged } = useContext(LogContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const login = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/auth/login", {
      username: username,
      password: password,
    });
    if (res.status === 200) {
      setUser(username);
      setIslogged(true);
    }

    await router.push("/");
  };

  return (
    <form>
      <h2>Login:</h2>
      <input
        placeholder="Username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      ></input>
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <br />
      <button type="submit" onClick={(e) => login(e)}>
        Login
      </button>
    </form>
  );
}

export default Login;
