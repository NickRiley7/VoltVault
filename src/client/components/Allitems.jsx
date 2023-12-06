import React, { useState, useEffect } from "react";
import axios from "axios";

function AllItems() {
  const [items, setItems] = useState([]);
  // const navigate = useNavigate()

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
            <li key={item.id}>
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>
              <img src={item.img} alt={`Image of ${item.name}`} />
              
              
            </li>
          ))}
        </ul>
      ) : (
        <h2>
          Loading Items ... <br />
          <br />
          A wizard is never late, nor is he early, he arrives precisely when he means to. 🧙‍♂️
        </h2>
      )}
    </div>
  );
}

export default AllItems;