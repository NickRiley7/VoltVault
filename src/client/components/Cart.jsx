import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

let API = 'http://localhost:3000/api'
/*
 
NOTES ON CART.JSX

1. can only be accessed by logged-in user;
2. should GET OrderByUserId ENDPOINT (orders/open_orders/:userId)
3. there should be a PATCH ENDPOINT for order_items to adjust the quantity of an item (order_items/:orderItemsId)
4. still need to set up a Route into the cart
5. need to get user ID information from login/register

 */

function Cart({ token, setToken, cart, setCart, user, items, setItems, totalCart, setTotalCart, quantity, setQuantity }) {

  useEffect(() => {
    if (token) {
      fetchCart()
    }
  }, [token])

  const navigate = useNavigate()

  async function fetchCart() {
    try {
      let response = await fetch(`${API}/orders/open_orders/${user.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        })
      let json = await response.json()
      console.log(json)
      if (json.id) {
        console.log(json)
        console.log(json.items)
        setItems(json.items)
        setCart(json)
        console.log(user)
        console.log(json.items)

        const totalItemAmount = items.map(item => item.price * item.quantity)
        console.log(totalItemAmount)
        const overallTotalAmount = totalItemAmount.reduce((acc, cur) => acc + cur, 0)
        console.log(overallTotalAmount)
        setTotalCart(overallTotalAmount)
      }
      else {
        setItems([])
        setCart({})
      }
    }
    catch (error) {
      console.error('ERROR! in fetchCart', error)
    }
  }

  const totalItemAmount = items.map(item => item.price * item.quantity)
  // console.log(totalItemAmount)
  const overallTotalAmount = totalItemAmount.reduce((acc, cur) => acc + cur, 0)
  // console.log (overallTotalAmount)
  // console.log(cart.id)

  async function addItem(item) {
    try {
      const response = await fetch(`${API}/order_items/${item.orderItemsId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            quantity: item.quantity + 1
            // need to figure out how to PATCH quantity +1 when adding more item
          })
        })
      let json = await response.json()
      // setQuantity(json.)

      fetchCart()


    } catch (error) {
      console.error('error in adding item quantity', error)
    }
  }

  async function reduceItem(item) {
    try {
      const response = await fetch(`${API}/order_items/${item.orderItemsId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            quantity: item.quantity - 1
          })
        })
      let json = await response.json()

      fetchCart()


    } catch (error) {
      console.error('error in adding item quantity', error)
    }
  }

  async function deleteItem(item) {
    try {
      const response = await fetch(`${API}/order_items/${item.orderItemsId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        })
      let json = await response.json()

      fetchCart()

    } catch (error) {
      console.error('error in deleting item in cart', error)
    }
  }

  async function checkOut(cart) {
    try {
      const response = await fetch(`${API}/orders/${cart.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          isOpen: true
        })
      })
      let json = await response.json()
      console.log(json)
      fetchCart()
      navigate('/checkout')
    }
    catch (error) {
      console.error('error in checking out items', error)
    }
  }

  /*
    DELETE FUNCTION HERE. We can do something similar to returning book in BOOKBUDDY

    Also need to create the DELETE button
  */

  if (token) {
    return (

      <>
        <h2 className="mt-5 mb-4">Welcome {user.firstname} {user.lastname} to your cart!</h2>

          {
            items.length ?
              items.map(item => {
                // setQuantity(item.quantity)
                const orderItemsId = item.orderItemsId
                return (
                  <div>
                    <div className="card m-1 mb-3 mx-auto p-2 col-12 col-sm-12 col-md-12 col-lg-12 shadow p-3 mb-5 bg-body-tertiary rounded" key={item.id}>
                      <div className="card-body">
                        <img className="card-img-top" src={item.img} />
                        <h3 className="card-title">{item.name}</h3>
                        <div className="text-body-secondary">price {item.price}</div>
                        <div className="text-body-secondary">quantity {item.quantity}</div>
                        <button type="button" className="btn btn-success" onClick={() => addItem(item)}>add item</button>
                        <button type="button" className="btn btn-danger m-1" onClick={() => reduceItem(item)}>reduce item</button>
                        <button type="button" className="btn btn-danger" onClick={() => deleteItem(item)}>DELETE</button>
                      </div>

                      {/* <div>
                    <input 
                      type="number"
                      value={quantity}
                      onChange={(e)=>setQuantity(item.id, e.target.value)} />
                      <button type="submit">submit</button>
                    <form onSubmit={addItem}>

                    </form>
                  </div> */}
                    </div >
                  </div>
                )
              })
              :
              <h3 className="card-title">Cart is empty</h3>
          }
          <h3 className="card-title mb-3">TOTAL AMOUNT {overallTotalAmount}</h3>
          <button type="button" className="btn btn-primary mb-5" onClick={() => checkOut(cart)}>Check Out</button>
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
  else return <h1>You have no item in your cart</h1>
};


export default Cart;
