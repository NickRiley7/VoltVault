import { useState } from "react";
import { Link } from "react-router-dom";
import Searchbar from "./SearchBar";

export default function Navigations({ admin, token, setToken, setCart }) {
  
  const [category, setCategory] = useState(null);

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

            

            <div className="dropdown me-2">
              <button
                className="btn btn-outline-primary btn-sm dropdown-toggle"
                type="button"
                id="categoryDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {category ? category : "Select Category"}
              </button>
              <ul className="dropdown-menu" aria-labelledby="categoryDropdown">
                <li>
                  <button
                    className={`dropdown-item ${category === 'phone' ? 'active' : ''}`}
                    onClick={() => handleCategoryChange('phone')}
                  >
                    Phone
                  </button>
                </li>
                <li>
                  <button
                    className={`dropdown-item ${category === 'computer' ? 'active' : ''}`}
                    onClick={() => handleCategoryChange('computer')}
                  >
                    Computer
                  </button>
                </li>
                <li>
                  <button
                    className={`dropdown-item ${category === null ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(null)}
                  >
                    None
                  </button>
                </li>
              </ul>
            </div>

            

            <Searchbar category={category} />

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
                className="btn btn-outline-primary m-1"
                src="/src/client/assets/vecteezy_shopping-cart.png"
                alt="Cart"
              ></img>
            </Link>
          </div>
        </div>
      </nav>
    );
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

            {/* Category Selection Buttons */}
            <div className="btn-group me-2">
              <button
                type="button"
                className={`btn btn-outline-primary ${category === 'phone' ? 'active' : ''}`}
                onClick={() => setCategory('phone')}
              >
                Phone
              </button>
              <button
                type="button"
                className={`btn btn-outline-primary ${category === 'computer' ? 'active' : ''}`}
                onClick={() => setCategory('computer')}
              >
                Computer
              </button>
              <button
                type="button"
                className={`btn btn-outline-primary ${category === null ? 'active' : ''}`}
                onClick={() => setCategory(null)}
              >
                None
              </button>
            </div>

            <Searchbar category={category} />

            <Link
              to="account"
              className="btn btn-outline-primary"
              tabIndex="-1"
              role="button"
            >
              Account
            </Link>
            <Link
              to="/"
              className="btn btn-outline-primary m-1"
              tabIndex="-1"
              role="button"
              onClick={() => {
                setToken(null);
              }}
            >
              Logout
            </Link>
            <Link to="cart">
              <img
                id="cart"
                href="#"
                className="btn btn-outline-primary m-1"
                src="/src/client/assets/vecteezy_shopping-cart.png"
                alt="Cart"
              ></img>
            </Link>
          </div>
        </div>
      </nav>
    );
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

            <Searchbar category={category} />

            <Link
              to="account"
              className="btn btn-outline-primary"
              tabIndex="-1"
              role="button"
            >
              Account
            </Link>
            <Link
              to="/"
              className="btn btn-outline-primary m-1"
              tabIndex="-1"
              role="button"
              onClick={() => {
                setToken(null);
                setCart({});
              }}
            >
              Logout
            </Link>
            <Link to="cart">
              <img
                id="cart"
                href="#"
                className="btn btn-outline-primary"
                src="/src/client/assets/vecteezy_shopping-cart.png"
                alt="Cart"
              ></img>
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}
