import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
let API = "http://localhost:3000/api";
import Popup from "reactjs-popup";
import { Navigate } from "react-router-dom";

function InventoryTable({ admin, token }) {
  const [inventory, setInventory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllInventory();
  }, []);

  async function fetchAllInventory() {
    try {
      let { data } = await axios.get(`${API}/items/inventory`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setInventory(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function removeItem(id) {
    try {
      await axios.delete(`${API}/items/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      fetchAllInventory();
    } catch (err) {
      console.error(err);
    }
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
                  {/* ON CLICK -- NAV TO SINGLE ITEM PAGE AND EDIT THERE?  */}
                  <td>
                    <button onClick={() => navigate(`/items/${item.id}`)}>
                      Edit
                    </button>
                  </td>
                  <td>
                    <Popup
                      trigger={<button>Delete</button>}
                      position="center"
                      modal
                      nested
                    >
                      {(close) => (
                        <div>
                          <div>Permanently delete {item.name}?</div>
                          <div>
                            <button
                              onClick={() => {
                                removeItem(item.id);
                              }}
                            >
                              Delete Item
                            </button>
                            <button onClick={() => close()}>Close</button>
                          </div>
                        </div>
                      )}
                    </Popup>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  } else {
    return <h1>You must have admin rights to view this page.</h1>;
  }
}

export default InventoryTable;
