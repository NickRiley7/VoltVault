import { Link } from 'react-router-dom';

export default function Navigations() {
  return (
    <nav>
      {/* <ul className='navbar'>
        <li>
          <Link to="/login" target='_blank'>Login</Link>
        </li>
        <li>
          <Link to="/account" target='_blank'>Account</Link>
        </li>
        <li>
          <Link to="/register" target='_blank'>Register</Link>
        </li>
        <li>
          <Link to="/cart" target='_blank'>Cart</Link>
        </li>
        <li>
          <Link to="/orders" target='_blank'>Orders</Link>
        </li>
      </ul> */}

      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
          <a class="navbar-brand" href="/">
            <img src="./computer.png" alt="Logo" width="30" height="30" class="d-inline-block align-text-top" />VoltVault</a>

          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Wishlist</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/login" target='_blank'>Login</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Shop
                </a>
                <ul class="dropdown-menu">
                  {/* Links aren't connected yet! */}
                  <li><a class="dropdown-item" href="#">Phones</a></li>
                  <li><a class="dropdown-item" href="#">Computers</a></li>
                  <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
            </ul>
            <form class="d-flex" role="search">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
            <a href="login" target='_blank' class="btn btn-outline-primary" tabindex="-1" role="button">Login</a>
            <a href="#" target='_blank' class="btn btn-outline-primary" tabindex="-1" role="button">Signup</a>
          </div>
        </div>
      </nav>

      {/* This is the small gray bar under the navbar with links */}
      <div>
        <ul class="nav bg-secondary bs-secondary-color">
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
        </ul>
      </div>

    </nav>
  );
};