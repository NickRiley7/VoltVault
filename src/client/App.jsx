import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import chalk from 'chalk';
import Login from './components/Login';
import Navigations from './components/Navigation';

// import Orders from './components/Orders';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Navigations />
      <>
        <div className='App'>
          {/* <h1>VoltVault</h1> */}
          {/* <img id='comp-img' src='./computer.png'></img> */}

        <Routes>
          <Route path="login" element={<Login />} />
        </Routes>
        </div>



      </>
    </Router>
  );
}

export default App;
