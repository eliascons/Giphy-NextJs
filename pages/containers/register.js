import { useState } from 'react';
import {useRouter} from 'next/router';
import axios from 'axios';


function Register() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();



  const register = async (e) => {
    e.preventDefault();
    const res = await axios.post('/api/auth/register', ({username: username, password: password}));
    console.log(res);
    await router.push('/containers/login');

  }


  return (
    <form>
      <h2>Register:</h2>
      <input placeholder='Username' type='text' value={username} onChange={(e) => setUsername(e.target.value)}></input><br />
      <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}></input><br />
      <button type='submit' onClick={(e) => register(e)}>Register</button>
      

    </form>
  )
}

export default Register;