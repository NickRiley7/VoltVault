import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import chalk from 'chalk';
import Login from './components/Login';
// import Cart from './components/Cart';
// import Orders from './components/Orders';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <>
        <div className='App'>
          <h1>VoltVault</h1>
          <img id='comp-img' src='./computer.png'></img>
          <Login />
        </div>

        {/* <Routes>
          
        </Routes> */}


      </>
    </Router>
  );
}

export default App;
