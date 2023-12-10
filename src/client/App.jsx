import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import chalk from "chalk";
import Login from "./components/Login";
import Navigations from "./components/Navigation";
import Register from "./components/Register";
import AllItems from "./components/Allitems";
import UserAccount from "./components/UserAccount";
import FilterForComputer from "./components/ComputerFilter";
import FilterForPhone from "./components/PhoneFilter";

import ItemDetails from "./components/SingleItemDetail";

import AllUsers from "./components/AllUsers";
import Cart from "./components/Cart";

// import Orders from './components/Orders';

function App() {
  const [token, setToken] = useState(null);
  const [cart, setCart] = useState ([])

  return (
    <>
      <Navigations token={token} />
      <div className="App">
        {/* <h1>VoltVault</h1> */}
        {/* <img id='comp-img' src='./computer.png'></img> */}

        <Routes>
          <Route
            path="login"
            element={<Login token={token} setToken={setToken} />}
          />
          <Route
            path="register"
            element={<Register token={token} setToken={setToken} />}
          />
          <Route path="/" element={<AllItems token={token} />} />
          <Route path="account" element={<UserAccount token={token} />} />
          <Route path="/computer" element={<FilterForComputer />} />
          <Route path="/phones" element={<FilterForPhone />} />
          <Route
            path="/items/:itemid"
            element={<ItemDetails token={token} />}
          />
          <Route path="users" element={<AllUsers token={token} />} />
          <Route 
            path="cart/:cartid" element={
              <Cart 
                token={token} setToken={setToken}
                cart={cart} setCart={setCart} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
