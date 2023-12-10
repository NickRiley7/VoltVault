import React from "react";
/*
 
NOTES ON CART.JSX

1. can only be accessed by logged-in user;
2. should GET OrderByUserId ENDPOINT (orders/open_orders/:userId)
3. there should be a PATCH ENDPOINT for order_items to adjust the quantity of an item (order_items/:orderItemsId)
4. still need to set up a Route into the cart

 */

const Cart = ({ cart, token }) => {
  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price.toFixed(2)}
          </li>
        ))}
      </ul>
      <p>
        Total: ${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}
      </p>
    </div>
  );
};

export default Cart;
