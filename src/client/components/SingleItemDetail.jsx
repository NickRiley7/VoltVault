import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

function ItemDetails() {
  const [item, setItem] = useState(null);
  const { itemid } = useParams();

  useEffect(() => {
    fetchSingleItemDetail();
  }, [itemid]);

  async function fetchSingleItemDetail() {
    let API = "http://localhost:3000/api";

    try {
      const response = await axios.get(`${API}/items/${itemid}`);
      setItem(response.data);
    } catch (err) {
      console.error(err);
      setItem(null);
    }
  }

  if (!item) {
    return (
      <p>
        Loading... <br />
        <br />
        A wizard is never late, nor is he early, he arrives precisely when he means to. 🧙‍♂️
      </p>
    );
  }

  return (
    <div id="singleItem" className="card mb-3 w-75 mb-3 shadow p-3 mb-5 bg-body-tertiary rounded singleItemDetail">
      <div className="row g-0">
        <div className="col-md-4">
          <img src={item.img} className="img-fluid rounded-start" alt={`Image of ${item.name}`} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h2 className="card-title pb-2">{item.name} details </h2>
            <p>{item.details}</p>
            <p className="card-text"><small className="text-body-secondary">Stock: {item.stock}</small></p>
            <p className="card-text"><small className="text-body-secondary">Price: ${item.price}</small></p>
            <br />
            <button type="button" className="btn btn-outline-success"> Add item to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetails;