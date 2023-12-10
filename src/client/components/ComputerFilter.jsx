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


}