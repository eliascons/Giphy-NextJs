import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { UserContext, LogContext } from "../context/userContext.js";
import axios from "axios";

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
    <form>
      <h2>Register:</h2>
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
      <button type="submit" onClick={(e) => register(e)}>
        Register
      </button>
    </form>
  );
}

export default Register;
