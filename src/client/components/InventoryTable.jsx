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

  async function destroyItem(id) {
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
        <div className="table-responsive">
          <table className="table table-striped table-hover table-light">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Category</th>
                <th scope="col">Price</th>
                <th scope="col">Stock</th>
                <th scope="col"></th>
                <th scope="col"></th>
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
                      <button
                        onClick={() => navigate(`/items/${item.id}`)}
                        className="btn btn-primary s-1"
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <Popup
                        trigger={
                          <button className="btn btn-danger s-1">Delete</button>
                        }
                        position="center"
                        modal
                        nested
                      >
                        {(close) => (
                          <div className="p-3 bg-light rounded border border-dark">
                            <div>Permanently delete {item.name}?</div>
                            <div>
                              <button
                                onClick={() => {
                                  destroyItem(item.id);
                                }}
                                className="btn btn-danger p-1"
                              >
                                Delete Item
                              </button>
                              <button
                                onClick={() => close()}
                                className="btn btn-light p-1"
                              >
                                Close
                              </button>
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
        </div>
      </>
    );
  } else {
    return <h1>You must have admin rights to view this page.</h1>;
  }
}

export default InventoryTable;
