import axios from "axios";
import { useEffect, useState } from "react";
let API = "http://localhost:3000/api";

function UserAccount() {
  const [firstName, setFirstName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchUser();
    fetchOrders();
  }, []);

  async function fetchUser() {
    try {
      let { data } = await axios.get(`${API}/users/1`);
      console.log(data);
      setFirstName(data.firstname);
      setUsername(data.username);
      setEmail(data.email);
    } catch (err) {
      console.error(err.message);
    }
  }

  async function fetchOrders() {
    try {
      let { data } = await axios.get(`${API}/`);
    } catch (err) {
      console.error(err.message);
    }
  }

  // if (!token) {
  //   return <h2>Please login or create an account.</h2>;
  // } else {
  //   return (
  //     <>
  //       <h1>Hi, {firstName}</h1>
  //       <h2>Your Username: {username}</h2>
  //       <h2>Your Email: {email}</h2>
  //     </>
  //   );
  // }

  return (
    <>
      <h1>Hi, {firstName}</h1>
      <h2>Your Username: {username}</h2>
      <h2>Your Email: {email}</h2>
    </>
  );
}

export default UserAccount;
