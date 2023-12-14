import axios from "axios";
import Popup from "reactjs-popup";
let API = "http://localhost:3000/api";
import { useState } from "react";

function AddItemPopUp({ token, fetchAllInventory }) {
  const [newItemName, setNewItemName] = useState("");
  const [newItemDetails, setNewItemDetails] = useState("");
  const [newItemPrice, setNewItemPrice] = useState();
  const [newItemImg, setNewItemImg] = useState("");
  const [newItemCat, setNewItemCat] = useState("");
  const [newItemStock, setNewItemStock] = useState();

  async function addItem() {
    try {
      const { data } = await axios.post(
        `${API}/items`,
        {
          name: newItemName,
          price: newItemPrice,
          details: newItemDetails,
          img: newItemImg,
          category: newItemCat,
          stock: newItemStock,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("POST SENT: ", data);
      console.log(data.img);
      setNewItemName("");
      setNewItemDetails("");
      setNewItemPrice();
      setNewItemImg("");
      setNewItemCat("");
      setNewItemStock();
      fetchAllInventory();
    } catch (err) {
      console.error(err.message);
    }
  }
  return (
    <Popup
      trigger={
        <button type="button" className="btn btn-outline-success s-1">
          Add Item
        </button>
      }
      position="center"
      modal
      nested
    >
      {(close) => (
        <div className="p-3 bg-light rounded border border-dark">
          <form
            id="itemEditPopUp"
            onSubmit={(e) => {
              e.preventDefault();
              addItem();
              close();
            }}
          >
            <h3>Add New Item</h3>
            <label>
              Item Name
              <input
                type="text"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
              />
            </label>
            <label>
              Item Details
              <textarea
                value={newItemDetails}
                onChange={(e) => setNewItemDetails(e.target.value)}
              />
            </label>
            <label>
              Category
              <select
                value={newItemCat}
                onChange={(e) => setNewItemCat(e.target.value)}
              >
                <option value="Phone">Phone</option>
                <option value="Computer">Computer</option>
              </select>
            </label>
            <label>
              Price
              <input
                type="number"
                min="0"
                step="0.01"
                value={newItemPrice}
                onChange={(e) => setNewItemPrice(e.target.value)}
              />
            </label>
            <label>
              Stock
              <input
                type="number"
                min="0"
                step="1"
                value={newItemStock}
                onChange={(e) => setNewItemStock(e.target.value)}
              />
            </label>
            <label>
              Image
              <input
                type="file"
                onChange={(e) => setNewItemImg(e.target.value)}
                accept="image/png, image/jpeg"
              />
            </label>
            <button type="submit" className="btn btn-success">
              Create Item
            </button>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => close()}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </Popup>
  );
}

export default AddItemPopUp;
