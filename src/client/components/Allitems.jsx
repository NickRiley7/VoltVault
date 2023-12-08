import { useEffect, useState } from "react";
import axios from "axios";
// import ItemDetails from "./singleItemDetail";
import { useNavigate } from "react-router-dom";

function AllItems() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    let API = "http://localhost:3000/api";

    try {
      const response = await axios.get(`${API}/items/`);
      setItems(response.data);
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <div>
      <h2>All Items</h2>
      {items.length ? (
        <ul>
          {items.map((item) => (
            <li
              id="cards"
              className="card m-1 w-75 mb-3 shadow p-3 mb-5 bg-body-tertiary rounded"
              key={item.id}
            >
              <div className="card-body">
                <img
                  className="card-img-top"
                  src={item.img}
                  alt={`Image of ${item.name}`}
                />
                <h3 className="card-title">{item.name}</h3>
                <p className="card-text">Price: ${item.price}</p>

                <p className="card-text">
                  Available in Stock: {item.stock > 0 ? "Yes" : "No"}
                </p>
                {/* <p>{item.stock}</p> */}

                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => navigate(`/items/${item.id}`)}
                >
                  {" "}
                  Show Item details
                </button>
                <button type="button" className="btn btn-outline-primary m-1">
                  {" "}
                  Add item to Cart
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <h2>
          Loading Items ... <br />
          <br />A wizard is never late, nor is he early, he arrives precisely
          when he means to. 🧙‍♂️
        </h2>
      )}
    </div>
  );
}

export default AllItems;
