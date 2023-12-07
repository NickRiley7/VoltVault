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
    <div className='singleItemDetail'>
      <h2>{item.name} details </h2>
      <p>{item.details}</p>
      <p>Stock: {item.stock}</p>
      <p>Price: ${item.price}</p>
      <img src= {item.img} alt={`Image of ${item.name}`} /> 
      <br/>
      <button> Add item to Cart</button>
    </div>
  );
}

export default ItemDetails;