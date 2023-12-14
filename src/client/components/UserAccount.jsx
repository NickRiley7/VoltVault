import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API = "http://localhost:3000/api";

function UserAccount({ token, admin, user }) {
  const [firstName, setFirstName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [order_Id, setOrder_Id] = useState("");
  const [itemsHistory, setItemsHistory] = useState([]);
  const [ordersHistory, setOrdersHistory] = useState([]);

  useEffect(() => {
    fetchUser();
    fetchOrders();
  }, []);

  async function fetchUser() {
    if (token) {
      try {
        let { data } = await axios.get(`${API}/users/account`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setFirstName(data.firstname);
        setUsername(data.username);
        setEmail(data.email);
        setLastName(data.lastname);
        setAddress(data.address);
        setAddress2(data.address2);
        setCity(data.city);
        setState(data.state);
        setZip(data.zip);
        setOrder_Id(data.order_id);
      } catch (err) {
        console.error(err.message);
      }
    }
  }

  async function fetchOrders() {
    try {
      let response = await fetch(
        `${API}/orders/complete_orders/${user.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let orderHistory = await response.json();
      setOrdersHistory(orderHistory);
      const itemsInOrder = orderHistory.map((order) => order.items);
      setItemsHistory(itemsInOrder);
    } catch (error) {
      console.error("error in fetching order history", error);
    }
  }

  if (!token) {
    return (
      <div className="container mt-5">
        <h2 className="text-center">
          Please <Link to="/login">login</Link> or{" "}
          <Link to="/register">create an account</Link>.
        </h2>
      </div>
    );
  } else if (token && admin) {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <div className="card bg-light p-3">
              <h1 className="text-center">Hi, {firstName}</h1>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Username: {username}</li>
                <li className="list-group-item">Email: {email}</li>
                <li className="list-group-item">First Name: {firstName}</li>
                <li className="list-group-item">Last Name: {lastName}</li>
                <li className="list-group-item">Address: {address}</li>
                <li className="list-group-item">Address 2: {address2}</li>
                <li className="list-group-item">City: {city}</li>
                <li className="list-group-item">State: {state}</li>
                <li className="list-group-item">Zipcode: {zip}</li>
              </ul>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card bg-light p-3">
              <form>
                <div className="mb-3">
                  <label className="form-label">Access Level</label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="adminAccess"
                      value="user"
                    />
                    <label className="form-check-label">User</label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="adminAccess"
                      value="Admin"
                    />
                    <label className="form-check-label">Admin</label>
                  </div>
                </div>
              </form>
              {ordersHistory.length ? (
                <div>
                  <h3 className="text-center">Order History</h3>
                  {ordersHistory.map((order) => (
                    <div key={order.id} className="mb-3">
                      <div>Order ID: {order.id}</div>
                      <div>Order Date: {order.order_date.slice(0, 10)}</div>
                      <div>Order Total: ${order.order_total}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <h3 className="text-center">No order history</h3>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <div id="background">
              <div id="account-info">
                <h1 className="text-center">Hi, {firstName}</h1>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Username: {username}</li>
                  <li className="list-group-item">Email: {email}</li>
                  <li className="list-group-item">First Name: {firstName}</li>
                  <li className="list-group-item">Last Name: {lastName}</li>
                  <li className="list-group-item">Address: {address}</li>
                  <li className="list-group-item">Address 2: {address2}</li>
                  <li className="list-group-item">City: {city}</li>
                  <li className="list-group-item">State: {state}</li>
                  <li className="list-group-item">Zipcode: {zip}</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="col-11 col-sm-11 col-md-11 col-lg-11 m-5">
              {ordersHistory.length ? (
                <div>
                  <h3 className="text-center">Order History</h3>
                  {ordersHistory.map((order) => (
                    <div key={order.id} className="mb-3">
                      <div>Order ID: {order.id}</div>
                      <div>Order Date: {order.order_date.slice(0, 10)}</div>
                      <div>Order Total: ${order.order_total}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <h3 className="text-center">No order history</h3>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserAccount;
