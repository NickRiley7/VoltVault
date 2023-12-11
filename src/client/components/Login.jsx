import React, { useState, useEffect } from "react";
import Axios from "axios";
import { jwtDecode } from "jwt-decode";

import { useNavigate } from "react-router-dom";

const Login = ({ token, setToken, user, setUser, setAdmin }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const login = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const result = await response.json();
      console.log(result);
      setMessage(result.message);
      setToken(result.token);
      setUser(result.user)
      console.log (result.user.id)
      const decoded = jwtDecode(result.token);
      setAdmin(decoded.isAdmin);
      if (!response.ok) {
        throw result;
      }

      // console.log(decoded);
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error(`${err.name}: ${err.message}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <div id="loginPage">
      <div
        id="loginCard"
        className="card shadow p-3 mb-5 m-100 bg-body-tertiary rounded"
      >
        <h2>Login</h2>
        <form onSubmit={login}>
          <div className="form-floating mt-3">
            <input
              className="form-control shadow"
              aria-describedby="emailHelp"
              type="email"
              id="floatingInput"
              placeholder="name@example.com"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <label htmlfor="floatingInput">Email address</label>
          </div>

          <div className="form-floating mt-4">
            <input
              className="form-control shadow"
              type="password"
              id="floatingPassword"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Login
          </button>
        </form>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Login;
