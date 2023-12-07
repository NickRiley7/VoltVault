import { useEffect, useState } from "react";
export default function SelectedOrder({
  selectedOrderId,
  setSelectedOrderId,
}) {
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSelectedOrder() {
      try {
        const response = await fetch(
          `http://localhost:3000/${selectedOrderId}`
        );
        const contact = await response.json();
        setOrder(order);
      } catch (error) {
        setError(error);
      }
    }
    fetchSelectedOrder();
  }, []);

  return (
    <div>
      {order && (
        <div>
          <p>
            <b>Status:</b> {order.status}
          </p>
          <p>
            <b>Total:</b> {order.total}
          </p>
          <p>
            <b>Phone:</b> {contact.phone}
          </p>
          <div>
            <b>Address:</b>
            <p>
              <b>Street:</b>
              {contact.address.street}
              <br />
              <b>City/Zip:</b>
              {contact.address.city}
              {contact.address.zipcode}
            </p>
          </div>
          <p>
            <b>Company:</b> {contact.company.name}
          </p>
        </div>
      )} 
      <button
        onClick={() => {
          setSelectedOrderId(null);
        }}
      >
        Back
      </button>
    </div>
  );
}