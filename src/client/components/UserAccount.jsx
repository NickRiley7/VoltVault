import axios from "axios";
import { useEffect, useState } from "react";
let API = "http://localhost:3000/api";

function UserAccount() {
  const [firstName, setFirstName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    try {
      let { data } = await axios.get(`${API}/users/1`);
      setFirstName(data.firstname);
      setUsername(data.username);
      setEmail(data.email);
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <>
      <h1>Hi, {firstName}</h1>
      <h2>Your Username: {username}</h2>
      <h2>Your Email: {email}</h2>
    </>
  );
}

export default UserAccount;
