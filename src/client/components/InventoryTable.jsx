import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
    setInventory(data);
  }

  if (admin) {
    return (
      <>
        <h1>Inventory</h1>
        <table>
          <thead>
            <tr>
              <td>ID</td>
              <td>Name</td>
              <td>Category</td>
              <td>Price</td>
              <td>Stock</td>
              <td></td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.price}</td>
                  <td>{item.stock}</td>
                  <td>
                    <Link>Edit</Link>
                  </td>
                  <td>
                    <Link>Delete</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }

  return <h1>I'M HOOKED UP!</h1>;
}

export default InventoryTable;
