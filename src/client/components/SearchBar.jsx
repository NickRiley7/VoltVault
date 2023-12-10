import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Searchbar() {
  const [items, setItems] = useState([]);
  const [results, setResults] = useState([]);
  const [input, setInput] = useState("");
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const navigate = useNavigate();

  const fetchItems = async () => {
    let API = "http://localhost:3000/api";

    try {
      const response = await axios.get(`${API}/items/`);
      setItems(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  const fetchData = (value) => {
    if (value === "") {
      setResults([]);
    } else {
      const filteredResults = items.filter((item) => {
        return item && item.name && item.name.toLowerCase().includes(value.toLowerCase());
      });

      setResults(filteredResults);
    }
  };

  const handleItemClick = (itemId) => {
    navigate(`/items/${itemId}`);
    setResults([]);
    setInput("");
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div id="searchBar" className="nav-search-field position-absolute w-50 top-0 start-50 translate-middle-x">
      <form className="d-flex" role="search">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search..."
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />
      </form>

      {results.length > 0 && (
        <div id="searchCard" className="card w-100">
          <div className="card-body">
            {results.map((result) => (
              <p
                className={`card-text search-result-item p-2 mb-1 rounded cursor-pointer ${
                  hoveredItemId === result.id ? "bg-primary" : ""
                }`}
                key={result.id} onClick={() => handleItemClick(result.id)} onMouseEnter={() => setHoveredItemId(result.id)} onMouseLeave={() => setHoveredItemId(null)}>
                {result.name}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Searchbar;