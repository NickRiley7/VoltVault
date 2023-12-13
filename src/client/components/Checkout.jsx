import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

let API = 'http://localhost:3000/api'

function Checkout({ token, setToken, cart, setCart, user, items, setItems, totalCart, setTotalCart, quantity, setQuantity }) {

  console.log('this is token', token)
  console.log(user)


  useEffect(() => {
    if (token) {
      fetchCart()
    }
  }, [token])

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
          isOpen: false
        })
      })
      let json = await response.json()
      console.log(json)
      fetchCart()
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
      <div id="checkoutStyle">
        <>
          <div className="card m-1 mb-3 mx-auto p-2 col-12 col-sm-12 col-md-12 col-lg-12 shadow p-3 mb-5 bg-body-tertiary rounded">
            <h2 className=" card-title mt-5 mb-4">Welcome {user.firstname} {user.lastname} to your checkout!</h2>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped table-hover shadow table-light">
                  <thead>
                    <tr>
                      <th scope="col">Item</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Price per Unit</th>
                      <th scope="col">Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      items.map(item => {
                        return (
                          <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                            <td>{item.price * item.quantity}</td>
                          </tr>
                        )
                      })
                    }
                    <tr>
                      <td colSpan={3}>Total Amount</td>
                      <td>{cart.order_total}</td>
                    </tr>
                  </tbody>
                </table>

              </div>
            </div>
            <div id="shippingINFO">
              <h2>SHIPPING INFO</h2>
              <div className="text-body-secondary">firstname: {user.firstname}</div>
              <div className="text-body-secondary">lastname: {user.lastname}</div>
              <div className="text-body-secondary">address: {user.address}, {user.address2 ? user.address2 : ""} {user.city}, {user.state}</div>
              <div className="text-body-secondary">zip: {user.zip}</div>

              <button type="button" className="btn btn-outline-primary" onClick={() => checkOut(cart)}>Check Out</button>
            </div>
          </div>

        </>
      </div>
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

}

export default Checkout