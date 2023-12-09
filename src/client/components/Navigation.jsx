import { Link } from 'react-router-dom';
import Searchbar from './SearchBar';

export default function Navigations() {
  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img src="src/client/assets/TFFS0158.PNG" alt="Logo" width="40" height="35" className="d-inline-block align-text-top" href="/" />VoltVault</a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" target='_blank' href="#">Wishlist</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" target='_blank'>Insert text</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Shop
              </a>
              <ul className="dropdown-menu">
                {/* Links aren't connected yet! */}
                <li><a className="dropdown-item" href="#">Phones</a></li>
                <li><a className="dropdown-item" href="#">Computers</a></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
          </ul>
          <div id="searchBar">
            <Searchbar />
          </div>




          <a href="login" className="btn btn-outline-primary m-1" tabIndex="-1" role="button">Login</a>
          <a href="register" className="btn btn-outline-primary" tabIndex="-1" role="button">Signup</a>
          <img id="cart" href="#" className="btn btn-light m-1" src='/src/client/assets/cart icon.png'></img>
        </div>
      </div>
    </nav>
  );
};
{/* This is the small gray bar under the navbar with links */ }
// <div>
//   <ul className="nav bg-secondary bs-secondary-color">
//     <li className="nav-item">
//       <a className="nav-link" href="#">Link</a>
//     </li>
//     <li className="nav-item">
//       <a className="nav-link" href="#">Link</a>
//     </li>
//     <li className="nav-item">
//       <a className="nav-link" href="#">Link</a>
//     </li>
//   </ul>
// </div>
