import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import chalk from 'chalk';
import Login from './components/Login';
import Navigations from './components/Navigation';
// import Cart from './components/Cart';
// import Orders from './components/Orders';

function App() {
  const [token, setToken] = useState(0);

  return (
    <Router>
      <>
        <div className='App'>
          <h1>VoltVault</h1>
          <img id='comp-img' src='./computer.png'></img>

          <Navigations />
        </div>

        <Routes>
          <Route path="login" element={<Login />} />
        </Routes>


      </>
    </Router>
  );
}

export default App;
