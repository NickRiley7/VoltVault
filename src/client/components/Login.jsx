import React, { useState, useEffect } from "react";
import Axios from "axios";
import { jwtDecode } from "jwt-decode";

import { useNavigate } from "react-router-dom";

let API = "http://localhost:3000/api";

const Login = ({ token, setToken, user, setUser, setAdmin, cart, setCart }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const login = async (e) => {
    e.preventDefault();
    // useEffect(()=>{
    //   if (token) {
    //     fetchCart()
    //   }
    // }, [token])

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
      setMessage(result.message);
      setToken(result.token);
      setUser(result.user);
      const decoded = jwtDecode(result.token);
      setAdmin(decoded.isAdmin);

      fetchCart(result);
      if (!response.ok) {
        throw result;
      }
      setEmail("");
      setPassword("");
      navigate(`/`);
    } catch (err) {
      console.error(`${err.name}: ${err.message}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  async function fetchCart(result) {
    try {
      console.log("THIS IS USER ID IN FETCHCART LOGIN", result.user.id);
      console.log(result.token);
      let response = await fetch(
        `${API}/orders/open_orders/${result.user.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${result.token}`,
          },
        }
      );
      let json = await response.json();
      console.log("THIS IS WHAT IS IN THE CART", json);
      if (json.id) {
        setCart(json);
        console.log(user);
        console.log(json.items);
      } else {
        setCart({});
      }
    } catch (error) {
      console.error("ERROR! in fetchCart", error);
    }
  }

  return (
    <div className="col-12 col-sm-11 col-md-11 col-lg-5" id="loginPage">
      <div
        id="loginCard"
        className="card shadow p-3 m-5 m-100 bg-body-tertiary rounded"
      >
        <h2>Login</h2>
        <form onSubmit={login}>
          <div className="form-floating mt-3 col-5 col-sm-5 col-md-7 col-lg-12">
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

          <div className="form-floating mt-4 col-5 col-sm-5 col-md-7 col-lg-12">
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
