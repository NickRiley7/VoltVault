import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import chalk from 'chalk';
import Login from './components/Login';
import Navigations from './components/Navigation';
import Register from './components/Register';
import AllItems from './components/Allitems';
import UserAccount from "./components/UserAccount";
import ItemDetails from './components/singleItemDetail';
// import Orders from './components/Orders';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Navigations />
      <>
        <div className="App">
          {/* <h1>VoltVault</h1> */}
          {/* <img id='comp-img' src='./computer.png'></img> */}

        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/" element={<AllItems />} />
          <Route path="account" element={<UserAccount />} />
          <Route path="/items/:itemid" element ={<ItemDetails />}/>
        </Routes>
        </div>
      </>
    </Router>
  );
}

export default App;
