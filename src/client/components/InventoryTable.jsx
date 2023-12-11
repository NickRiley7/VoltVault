import { useEffect, useState } from "react";
import axios from "axios";
let API = "http://localhost:3000/api";

function InventoryTable({ admin, token }) {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    fetchAllInventory();
  }, []);

  async function fetchAllInventory() {
    let { data } = await axios.get(`${API}/items/inventory`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    // setInventory(data.users);
  }

  return <h1>I'M HOOKED UP!</h1>;
}

export default InventoryTable;
