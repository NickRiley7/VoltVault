import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

let API = 'http://localhost:3000/api'

function Checkout({ token, cart, setCart, user, items, setItems, totalCart, setTotalCart, quantity, setQuantity }) {



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
      if (json.id) {
        setItems(json.items)
        setCart(json)

        const totalItemAmount = items.map(item => item.price * item.quantity)
        const overallTotalAmount = totalItemAmount.reduce((acc, cur) => acc + cur, 0)
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
  const overallTotalAmount = totalItemAmount.reduce((acc, cur) => acc + cur, 0)

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

  async function handleCheckOut() {
    try {
      checkOut(cart)
      navigate('/thankyou')
    } catch (error) {
      console.error ('error in handling checkout button ', error)
    }
  }

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

              <button type="button" className="btn btn-outline-primary" onClick={() => handleCheckOut()}>Check Out</button>
            </div>
          </div>

        </>
      </div>
    );
  }
  else return <h1>You have no item in your cart</h1>

}

export default Checkout