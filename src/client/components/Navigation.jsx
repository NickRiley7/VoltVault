import { Link } from "react-router-dom";
import Searchbar from "./SearchBar";

export default function Navigations({ admin, token, setToken }) {
  // NOT SIGNED IN RENDER
  if (!token) {
    return (
      <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              src="src/client/assets/TFFS0158.PNG"
              alt="Logo"
              width="40"
              height="35"
              className="d-inline-block align-text-top"
              href="/"
            />
            VoltVault
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  target="_blank"
                  href="#"
                >
                  Wishlist
                </Link>
              </li> */}
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Shop
                </Link>
                <ul className="dropdown-menu">
                  {/* Links aren't connected yet! */}
                  <li>
                    <Link className="dropdown-item" to="/phones">
                      Phones
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/computer">
                      Computers
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
            <Searchbar />

            <Link
              to="login"
              className="btn btn-outline-primary m-1"
              tabIndex="-1"
              role="button"
            >
              Login
            </Link>
            <Link
              to="register"
              className="btn btn-outline-primary"
              tabIndex="-1"
              role="button"
            >
              Signup
            </Link>
            <Link to="cart">
              <img
                id="cart"
                href="#"
                className="btn btn-light m-1"
                src="/src/client/assets/cart icon.png"
              ></img>
            </Link>
          </div>
        </div>
      </nav>
    );
    // SIGNED IN USER RENDER
  } else if (!admin) {
    return (
      <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              src="src/client/assets/TFFS0158.PNG"
              alt="Logo"
              width="40"
              height="35"
              className="d-inline-block align-text-top"
              href="/"
            />
            VoltVault
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                target="_blank"
                href="#"
              >
                Wishlist
              </Link>
            </li> */}
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Shop
                </Link>
                <ul className="dropdown-menu">
                  {/* Links aren't connected yet! */}
                  <li>
                    <Link className="dropdown-item" to="/phones">
                      Phones
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/computer">
                      Computers
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
            <Searchbar />
            <Link
              to="account"
              className="btn btn-outline-primary"
              tabIndex="-1"
              role="button"
            >
              Account
            </Link>
            <Link to="cart">
              <img
                id="cart"
                href="#"
                className="btn btn-light m-1"
                src="/src/client/assets/cart icon.png"
              ></img>
            </Link>
            <Link
              to="/"
              className="btn btn-outline-primary m-1"
              tabIndex="-1"
              role="button"
              onClick={() => setToken(null)}
            >
              Logout
            </Link>
          </div>
        </div>
      </nav>
    );
    // SIGNED IN ADMIN RENDER
  } else if (admin) {
    return (
      <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              src="src/client/assets/TFFS0158.PNG"
              alt="Logo"
              width="40"
              height="35"
              className="d-inline-block align-text-top"
              href="/"
            />
            VoltVault
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                target="_blank"
                href="#"
              >
                Wishlist
              </Link>
            </li> */}
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Shop
                </Link>
                <ul className="dropdown-menu">
                  {/* Links aren't connected yet! */}
                  <li>
                    <Link className="dropdown-item" to="/phones">
                      Phones
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/computer">
                      Computers
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Admin Tools
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/users">
                      Users
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/inventory">
                      Inventory
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
            <Searchbar />
            <Link
              to="account"
              className="btn btn-outline-primary"
              tabIndex="-1"
              role="button"
            >
              Account
            </Link>
            <Link to="cart">
              <img
                id="cart"
                href="#"
                className="btn btn-light m-1"
                src="/src/client/assets/cart icon.png"
              ></img>
            </Link>
            <Link
              to="/"
              className="btn btn-outline-primary m-1"
              tabIndex="-1"
              role="button"
              onClick={() => setToken(null)}
            >
              Logout
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}
