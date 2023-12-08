import { useState, useEffect } from "react";

import axios from "axios";

function Searchbar() {
  const [items, setItems] = useState([]);
  const [results, setResults] = useState([]);
  const [input, setInput] = useState("");

  
  const fetchItems = async () => {
    let API = "http://localhost:3000/api";

    try {
      const response = await axios.get(`${API}/items/`);
      setItems(response.data);

     
      fetchData(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  
  const fetchData = (items) => {
    
    const filteredResults = items.filter((item) => {
      
      return item && item.name && item.name.toLowerCase().includes(input.toLowerCase());
    });

    setResults(filteredResults);
  };

  
  const handleChange = (value) => {
    setInput(value);
    
    fetchData(items);
  };

  
  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      
      <div className="input-wrapper">
        <input placeholder="Search..." value={input} onChange={(e) => handleChange(e.target.value)}/>
      </div>

  
      {results.length > 0 && (
        <div>
          <ul>
            {results.map((result) => (
              <li key={result.id}>{result.name}</li>
            ))}
          </ul>
        </div>
      )}
      {results.length === 0 && <p>No item found.</p>}
    </div>
  );
}

export default Searchbar;