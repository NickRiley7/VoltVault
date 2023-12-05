import { Link } from 'react-router-dom';

export default function Navigations() {
  return (
    <nav>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">
            <img src="./computer.png" alt="Logo" width="30" height="30" class="d-inline-block align-text-top" />VoltVault</a>

          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" target='_blank' href="#">Wishlist</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" target='_blank'>Insert text</a>
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
              {/* styling for search bar. position-absolute top-5 start-50 end-0 w-50 translate-middle */}
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              {/* styling for button. position-absolute start-50 end-75 translate-middle */}
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
            <a href="login" target='_blank' class="btn btn-outline-primary m-1" tabindex="-1" role="button">Login</a>
            <a href="register" target='_blank' class="btn btn-outline-primary" tabindex="-1" role="button">Signup</a>
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