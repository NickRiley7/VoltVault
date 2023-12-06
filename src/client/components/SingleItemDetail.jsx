import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';


function ItemDetails () {
  const [item, setItem] = useState
  const {itemsId} =useParams ();

  useEffect(() => {
    fetchBookDetails();
  }, [itemsId]);

  async function fetchSingleItemDetail() {
    let API = "http://localhost:3000/api";

    try {
      const response = await axios.get(`${API}/items/:id`);
      setItem(response.data.item);
    } catch(err) {
      console.error(err)
    }
}

return (
  <div className ='singleItemDetail'>
    <h2>{item.name} details </h2>
    <p>{item.stock}</p>


  </div>
)
}


export default ItemDetails