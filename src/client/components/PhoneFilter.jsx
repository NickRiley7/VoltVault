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
      <h2 id="phoneTitle" >Phones</h2>
      {phoneItems.length ? (
        <div id="phoneFilterCard" className="row w-50 h-50">
          {phoneItems.map((item) => (
            <div className="card m-1 mb-3 mx-auto p-2 col-sm-5 col-md-5 col-lg-5 shadow p-3 mb-5 bg-body-tertiary rounded" key={item.id}>
              <div className="card-body">
                <img className="card-img-top" src={item.img} alt={`Image of ${item.name}`} />
                <h3 className="card-title">{item.name}</h3>
                <p className="card-text">{item.details}</p>
                <p className="card-text">Price: ${item.price}</p>
                <button className="btn btn-outline-primary" type="button" onClick={() => navigate(`/items/${item.id}`)}>
                  Show Item details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h2>No Phone found.</h2>
      )}
    </>
  );
}

export default FilterForPhone;