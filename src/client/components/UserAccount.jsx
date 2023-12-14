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
      <h2>
        Please <Link to="/login">login</Link> or{" "}
        <Link to="/register">create an account</Link>.
      </h2>
    );
  } else if (token && admin) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div id="admin-account-info">
              <h1>Hi, {firstName}</h1>
              <h2>Your Username: {username}</h2>
              <h2>Your Email: {email}</h2>
              <h2>Your First Name: {firstName}</h2>
              <h2>Your Last Name: {lastName}</h2>
              <h2>Your Address: {address}</h2>
              <h2>Your Address 2: {address2}</h2>
              <h2>Your City: {city}</h2>
              <h2>Your State: {state}</h2>
              <h2>Your Zipcode: {zip}</h2>
            </div>
          </div>
          <div className="col-md-6">
            <form>
              <label>
                User
                <input type="radio" name="adminAccess" value="user" />
              </label>
              <label>
                Admin
                <input type="radio" name="adminAccess" value="Admin" />
              </label>
            </form>
            {ordersHistory.length ? (
              ordersHistory.map((order) => (
                <div key={order.id}>
                  <div>Order ID: {order.id}</div>
                  <div>Order Date: {order.order_date.slice(0, 10)}</div>
                  <div>Order Total: {order.order_total}</div>
                </div>
              ))
            ) : (
              <h2>no order history</h2>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div id="background">
              <div id="account-info">
                <h1>Hi, {firstName}</h1>
                <h2>Your Username: {username}</h2>
                <h2>Your Email: {email}</h2>
                <h2>Your First Name: {firstName}</h2>
                <h2>Your Last Name: {lastName}</h2>
                <h2>Your Address: {address}</h2>
                <h2>Your Address 2: {address2}</h2>
                <h2>Your City: {city}</h2>
                <h2>Your State: {state}</h2>
                <h2>Your Zipcode: {zip}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="col-11 col-sm-11 col-md-11 col-lg-11 m-5">
              {ordersHistory.length ? (
                ordersHistory.map((order) => (
                  <div key={order.id} id="order-history">
                    <div className="table-responsive">
                      <table className="table-striped shadow table-hover table-light">
                        <thead>
                          <tr>
                            <th scope="col">Order ID: {order.id}</th>
                            <th scope="col">
                              Order Date: {order.order_date.slice(0, 10)}
                            </th>
                            <th scope="col">Order Total: {order.order_total}</th>
                          </tr>
                        </thead>
                      </table>
                    </div>
                  </div>
                ))
              ) : (
                <h2>no order history</h2>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserAccount;
