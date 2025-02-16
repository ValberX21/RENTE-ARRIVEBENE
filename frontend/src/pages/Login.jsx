import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { postBody } from '../services/api'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    try
    {
      const user = { email, password };
      const acessToken =  await postBody('http://localhost:7000/api/auth/login/', user, 'POST');

      if (acessToken) {
        sessionStorage.setItem("token", acessToken.token);
        login(user);
        navigate('/dashboard', { replace: true });
    } else {
        console.error("Login failed. No token received.");
    }
    }
    catch(ex)
    {
      console.error('Something wrogn !:' + ex)
    }
   
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Welcome to Arrivabene Real estate</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
