import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
let API = 'http://localhost:3000/api'
/*
 
NOTES ON CART.JSX

1. can only be accessed by logged-in user;
2. should GET OrderByUserId ENDPOINT (orders/open_orders/:userId)
3. there should be a PATCH ENDPOINT for order_items to adjust the quantity of an item (order_items/:orderItemsId)
4. still need to set up a Route into the cart
5. need to get user ID information from login/register

 */

function Cart ({token, setToken, cart, setCart, user, items, setItems}) {

useEffect(() => {
  if (token){
    fetchCart()
  }
}, [token])

  async function fetchCart() {
    try {
      let response = await fetch (`${API}/orders/open_orders/${user.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${token}`
        }
      })
      let json = await response.json()
      setItems(json[0].items)
      setCart(json)
      console.log (user)
      console.log (json[0].items)
    }
    catch (error){
      console.error('ERROR! in fetchCart', error)
    }
  }

  if (token) {
    return (
  
      <>
        <h2>Welcome {user.firstname} {user.lastname} to your cart!</h2>

        {
          items.length ? 
            items.map (item => {
              return (
                <li key={item.id}>
                  <h3>{item.name}</h3>
                </li>
              )
            })
            : 
            <h3>Cart is empty</h3>
        }
      </>
      // <div>
      //   <h2>Shopping Cart</h2>
      //   <ul>
      //     {cart.map((item) => (
      //       <li key={item.id}>
      //         {item.name} - ${item.price.toFixed(2)}
      //       </li>
      //     ))}
      //   </ul>
      //   <p>
      //     Total: ${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}
      //   </p>
      // </div>
    );
  }
  else return <h1>This is {token}</h1>
};


export default Cart;
