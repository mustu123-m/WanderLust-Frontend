import { useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import Razorpay from 'razorpay';
function Payment() {
  const { state } = useLocation();

  if (!state) {
    return <Navigate to="/" />;
  }
   const BASE_URL=import.meta.env.VITE_BASE_URL;
  const { booking,order,razorpayKey } = state;
  const [options,setoptions]=useState(null);
useEffect(() => {
  if (!booking || !order) return;

  const options = {
    key: razorpayKey,
    amount: booking.totalPrice * 100,
    currency: "INR",
    name: "WanderLust",
    description: "Booking Payment",
    order_id: order.id,

    handler: async function (response) {
      try {
        const res = await fetch(
          `${BASE_URL}/listing/booking/verify`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingId: booking._id
            })
          }
        );

        const data = await res.json();

        if (data.success) {
          window.location.href = `/booking/${booking._id}/success`;
        }
      } catch (err) {
        console.error("Payment verification failed", err);
      }
    },

    theme: {
      color: "#e61e4d"
    }
  };

  // store on window (simple & safe)
  window.razorpayOptions = options;

}, [booking, order, razorpayKey]);
const onClickHandler = () => {
  if (!window.razorpayOptions) return;
  const rzp = new window.Razorpay(window.razorpayOptions);
  rzp.open();
};
  return (
    <>
    <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    <div className="container mt-5">
      <h2>Payment</h2>
      <p>Booking ID: {booking._id}</p>
      <p>Total Amount: ₹{booking.totalPrice}</p>

      <button onClick={onClickHandler}>Pay</button>
    </div>
    </>
  );
}

export default Payment;