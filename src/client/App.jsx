import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import chalk from "chalk";
import Login from "./components/Login";
import Navigations from "./components/Navigation";
import Register from "./components/Register";
import AllItems from "./components/Allitems";
import UserAccount from "./components/UserAccount";

import ItemDetails from "./components/SingleItemDetail";

import AllUsers from "./components/AllUsers";

// import Orders from './components/Orders';

function App() {
  const [count, setCount] = useState(0);
  const [token, setToken] = useState("");

  return (
    <Router>
      <Navigations />
      <>
        <div className="App">
          {/* <h1>VoltVault</h1> */}
          {/* <img id='comp-img' src='./computer.png'></img> */}

          <Routes>
            <Route path="login" element={<Login setToken={setToken} />} />
            <Route path="register" element={<Register setToken={setToken} />} />
            <Route path="/" element={<AllItems token={token} />} />
            <Route path="account" element={<UserAccount token={token} />} />
            <Route
              path="/items/:itemid"
              element={<ItemDetails token={token} />}
            />
            <Route path="users" element={<AllUsers token={token} />} />
          </Routes>
        </div>
      </>
    </Router>
  );
}

export default App;
