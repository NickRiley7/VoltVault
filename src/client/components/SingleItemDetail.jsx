import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

let API = 'http://localhost:3000/api'

function ItemDetails({token, cart, setCart}) {
  const [item, setItem] = useState(null);
  const { itemid } = useParams();

  useEffect(() => {
    fetchSingleItemDetail();
  }, [itemid]);

  // console.log (cart.items)
  // const itemsInCart = cart.items
  // console.log(itemsInCart)
  // const itemsIdInCart = itemsInCart.map (item => item.id)
  // console.log (itemsIdInCart)

  async function fetchSingleItemDetail() {
    // let API = "http://localhost:3000/api";

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
        <br />A wizard is never late, nor is he early, he arrives precisely when
        he means to. 🧙‍♂️
      </p>
    );
  }

  console.log(item.img);

  
  /*
  POST Request for Add To Cart

  1. Create onClick event handler in button element below;
  2. Create fetch POST function for new cart (refer to line 122 of api/orders.js);
  3. However, only do the above if the user have no open cart (or if !cart);
  4. You may need to pass cart useState from app.jsx;
  5. If a user have an open cart, then run fetch POST function for new item into cart (refer to line 246 of api/orders.js)
  */
  
  async function createNewCart () {
    try {
      const response = await fetch (`${API}/orders`, {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${token}`
        },
        body: JSON.stringify({
          isOpen : true
        })
      })
      const json = await response.json()
      console.log (json)
      if (json.id){
        console.log('successfully created new cart!')
        addItemToCart(json)
        setCart (json)
      } else {
        console.log ('error in POST new cart')
      }
    } catch (error) {
      console.error ('error in creating new cart', error)
    }
  }

  async function addItemToCart (cart) {

    try{
      const response = await fetch (`${API}/orders/${cart.id}/items`, {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${token}`
        },
        body: JSON.stringify({
          item_id : itemid,
          quantity : 1
        })
      })
      let json = await response.json()
      console.log(json)
    } catch (error) {
      console.error ('ERROR ')
    }
  }

  async function handleAddToCart (){
    try{
      console.log ('THIS IS CART: ',cart)
      console.log ('THIS IS NO CART', !cart)
      if (cart.id){
        console.log ('adding item to cart...')
        addItemToCart(cart)
        console.log('added new item to cart!')
      } else {
        console.log ('creating new cart...')
        await createNewCart()
        console.log ('created new cart!')
        // addItemToCart(cart)
        console.log ('added new item to cart!')
      }
    }
    catch (error) {
      console.error ('error in handleAddToCart function', error)
    }
    
  }

  return (
    <div
      id="singleItem"
      className="card mb-3 w-75 mb-3 shadow p-3 mb-5 bg-body-tertiary rounded singleItemDetail"
    >
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={`${item.img}`}
            className="img-fluid rounded-start"
            alt={`Image of ${item.name}`}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h2 className="card-title pb-2">{item.name} details </h2>
            <p>{item.details}</p>
            <p className="card-text">
              <small className="text-body-secondary">Stock: {item.stock}</small>
            </p>
            <p className="card-text">
              <small className="text-body-secondary">
                Price: ${item.price}
              </small>
            </p>
            <br />
            <button onClick={() => handleAddToCart()} type="button" className="btn btn-outline-success">
              {" "}
              Add item to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetails;
