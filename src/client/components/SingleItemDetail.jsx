import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API = 'http://localhost:3000/api';

function ItemDetails({ token, cart, setCart }) {
  const [item, setItem] = useState(null);
  const [isInCart, setIsInCart] = useState(false);

  const { itemid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSingleItemDetail();
  }, [itemid, cart]);

  async function fetchSingleItemDetail() {
    try {
      const response = await axios.get(`${API}/items/${itemid}`);
      setItem(response.data);
      setIsInCart(cart.items && cart.items.some(item => item.id === parseInt(itemid)));
    } catch (err) {
      console.error(err);
      setItem(null);
      setIsInCart(false);
    }
  }

  async function handleAddToCart() {
    try {
      if (token) {
        if (!isInCart) {
          if (cart.id) {
            await addItemToCart(cart);
          } else {
            await createNewCart();
          }
          setIsInCart(true);
        } else {
          await removeItemFromCart();
          setIsInCart(false);
        }

        navigate("/cart");
      }
    } catch (error) {
      console.error('Error in handleAddToCart function', error);
    }
  }

  async function createNewCart() {
    try {
      const response = await fetch(`${API}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          isOpen: true,
        }),
      });
      const json = await response.json();
      if (json.id) {
        addItemToCart(json);
        setCart(json);
      } else {
        console.error('Error in POST new cart');
      }
    } catch (error) {
      console.error('Error in creating a new cart', error);
    }
  }

  async function addItemToCart(cart) {
    try {
      const response = await fetch(`${API}/orders/${cart.id}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          item_id: itemid,
          quantity: 1,
        }),
      });
      const json = await response.json();
      // You might want to perform additional actions after adding an item to the cart
    } catch (error) {
      console.error('ERROR ', error);
    }
  }

  async function removeItemFromCart() {
    try {
      const itemInCart = cart.items.find(item => item.id === parseInt(itemid));
      if (itemInCart) {
        const response = await fetch(`${API}/orders/${cart.id}/items/${itemInCart.orderItemsId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await response.json();
        // You might want to perform additional actions after removing an item from the cart
      }
    } catch (error) {
      console.error('ERROR ', error);
    }
  }

  return (
    <div id="singleItem" className="card mb-3 w-75 mb-3 shadow p-3 mb-5 bg-body-tertiary rounded singleItemDetail">
      <div className="row g-0">
        <div className="col-md-4">
          {item && item.img && (
            <img src={`${item.img}`} className="img-fluid rounded-start" alt={`Image of ${item.name}`} />
          )}
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h2 className="card-title pb-2">{item?.name} details</h2>
            <p>{item?.details}</p>
            <p className="card-text">
              <small className="text-body-secondary">Stock: {item?.stock}</small>
            </p>
            <p className="card-text">
              <small className="text-body-secondary"> Price: ${item?.price}</small>
            </p>
            <br />
            {token && (
              <button
                type="button"
                className={`btn ${isInCart ? 'btn-danger' : 'btn-outline-success'}`}
                onClick={() => handleAddToCart()}
                disabled={!token || isInCart}
              >
                {isInCart ? 'Item already in Cart' : 'Add item to Cart'}
              </button>
            )}
            {!token && (
              <button
                type="button"
                className="btn btn-danger"
                disabled
              >
                Please log in to add items to your cart.
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetails;