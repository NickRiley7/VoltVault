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
        // <div class="row row-cols-1 row-cols-md-2 g-4">
        //   <div class="col">
        <ul>
          <div class="card-group">
            {items.map((item) => (
              <li class="card m-1" key={item.id}>
                <h3 class="card-title">{item.name}</h3>
                <p class="card-body">Price: ${item.price}</p>
                <img class="card-img-top" src={item.img} alt={`Image of ${item.name}`} />

                <p>Available in Stock: {item.stock > 0 ? 'Yes' : 'No'}</p>

                <a href="#" class="btn btn-primary m-1" tabindex="-1">Show Item details</a>
                <a href="#" class="btn btn-primary" tabindex="-1">Add item to Cart</a>


              </li>
            ))}
          </div>
        </ul>
        //   </div>
        // </div>

      ) : (
        <h2>
          Loading Items ... <br />
          <br />
          A wizard is never late, nor is he early, he arrives precisely when he means to. 🧙‍♂️
        </h2>
      )
      }
    </div >
  );
}

export default AllItems;