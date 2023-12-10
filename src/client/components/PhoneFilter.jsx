import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FilterForPhone() {
  const [phoneItems, setPhoneItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPhoneItems();
  }, []);

  async function fetchPhoneItems() {
    let API = "http://localhost:3000/api";

    try {
      const response = await axios.get(`${API}/items/`);
      const filteredPhoneItems = response.data.filter(
        (item) => item.category === "phone"
      );
      setPhoneItems(filteredPhoneItems);
    } catch (err) {
      console.log("error getting the phones");
    }
  }

  return (
    <>
      <h2>Phones</h2>
      {phoneItems.length ? (
        <ul>
          {phoneItems.map((item) => (
            <li key={item.id}> 
             <h3>{item.name}</h3>
                <img src={item.img} alt={`Image of ${item.name}`}/>
              <p>{item.details}</p>
              <p>Price: ${item.price}</p>
              <button type="button" onClick={() => navigate(`/items/${item.id}`)}>
                  Show Item details
                </button>
            </li>
          ))}
        </ul>
      ) : (
        <h2>No Phone found.</h2>
      )}
    </>
  );
}

export default FilterForPhone;