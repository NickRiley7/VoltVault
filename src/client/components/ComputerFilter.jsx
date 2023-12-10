import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FilterForComputer () {
  const [computerItems, setComputerItems] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    fetchComputerItems();
  }, 
  []);

  async function fetchComputerItems(){
    let API = "http://localhost:3000/api";

    try {
      const response = await axios.get (`${API}/items/`);
      const filteredComputerItems = response.data.filter(
        (item) => item.category === "computer"
      );
      setComputerItems(filteredComputerItems);
    } catch (err){
      console.log("error getting the computers")
    }
  }

  return (
    <>
    <h2>Computers</h2>
    {computerItems.length ? (
            <ul>
            {computerItems.map((item) => (
              <li key={item.id} >
              </li>
            ))}
          </ul>
        ) : (
          <h2>No Computer items found.</h2>
        )}
      </>
    );
  

}

export default FilterForComputer