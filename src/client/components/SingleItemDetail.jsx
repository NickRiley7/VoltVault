import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

let API = 'http://localhost:3000/api';

function ItemDetails({ token, cart, setCart }) {
  const [item, setItem] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const { itemid } = useParams();

  const itemsInCart = cart.items || [];

  const isItemInCart = (cart, itemId) => {
    const itemsInCart = cart.items || [];
    const itemsIdInCart = itemsInCart.map(item => item.id);
    return itemsIdInCart.includes(itemId);
  };

  useEffect(() => {
    fetchSingleItemDetail();
    checkItemInCart();
  }, [itemid]);

  const checkItemInCart = () => {
    const isItemAlreadyInCart = isItemInCart(cart, itemid);
    setAddedToCart(isItemAlreadyInCart);
  };

  useEffect(() => {
    const storedAddedToCart = JSON.parse(localStorage.getItem(`addedToCart_${itemid}`));
    if (storedAddedToCart !== null) {
      setAddedToCart(storedAddedToCart);
    }
  }, [itemid]);

  async function fetchSingleItemDetail() {
    try {
      const response = await axios.get(`${API}/items/${itemid}`);
      setItem(response.data);
    } catch (err) {
      console.error(err);
      setItem(null);
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
      setAddedToCart(true);
    } catch (error) {
      console.error('ERROR ', error);
    }
  }

  async function handleAddToCart() {
    try {
      if (cart.id) {
        const isItemAlreadyInCart = isItemInCart(cart, itemid);

        if (!isItemAlreadyInCart) {
          await addItemToCart(cart);
          setAddedToCart(true);
          localStorage.setItem(`addedToCart_${itemid}`, JSON.stringify(true));
        } else {
          setAddedToCart(true);
          localStorage.setItem(`addedToCart_${itemid}`, JSON.stringify(true));
        }
      } else {
        await createNewCart();
        setAddedToCart(true);
        localStorage.setItem(`addedToCart_${itemid}`, JSON.stringify(true));
      }
    } catch (error) {
      console.error('Error in handleAddToCart function', error);
    }
  }

  return (
    <div
      id="singleItem"
      className="card mb-3 w-75 mb-3 shadow p-3 mb-5 bg-body-tertiary rounded singleItemDetail"
    >
      <div className="row g-0">
        <div className="col-md-4">
          {item && item.img && (
            <img
              src={`${item.img}`}
              className="img-fluid rounded-start"
              alt={`Image of ${item.name}`}
            />
          )}
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h2 className="card-title pb-2">{item?.name} details </h2>
            <p>{item?.details}</p>
            <p className="card-text">
              <small className="text-body-secondary">Stock: {item?.stock}</small>
            </p>
            <p className="card-text">
              <small className="text-body-secondary">
                Price: ${item?.price}
              </small>
            </p>
            <br />
            {addedToCart && token && (
              <div>
                <button
                  type="button"
                  className="btn btn-danger"
                  disabled
                >
                  Item already in Cart
                </button>
                <p style={{ color: 'red', fontWeight: 'bold' }}>Item added to the cart</p>
              </div>
            )}
            {!addedToCart && token && (
              <button
                onClick={() => handleAddToCart()}
                type="button"
                className="btn btn-outline-success"
              >
                {" "}
                Add item to Cart
              </button>
            )}
            {addedToCart && !token && (
              <p style={{ color: 'red', fontWeight: 'bold' }}>Item added to the cart</p>
            )}
            {!token && (
              <p style={{ color: 'red', fontWeight: 'bold' }}>
                Please log in to add items to your cart.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetails;