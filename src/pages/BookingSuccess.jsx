import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const API = "http://localhost:8080/api";

function BookingSuccess({setFlash}) {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/listing/booking/${bookingId}/success`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        if(data.success){
        setBooking(data.booking);
        setLoading(false);
        return;
        }
        else{
       setFlash({type:"danger",message:data.message});
        }
      })
      .catch(() => setLoading(false));
  }, [bookingId]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border"></div>
      </div>
    );
  }

  if (!booking) {
    return <p className="text-center mt-5">Booking not found</p>;
  }

  return (
    <div className="container mt-5">

      <div className="card shadow-sm p-4 text-center">

        {/* SUCCESS ICON */}
        <div className="mb-3">
          <i
            className="fa-solid fa-circle-check text-success"
            style={{ fontSize: "4rem" }}
          ></i>
        </div>

        <h2 className="mb-2">Booking Confirmed 🎉</h2>
        <p className="text-muted">
          Your payment was successful and your stay is booked.
        </p>

        <hr />

        {/* BOOKING DETAILS */}
        <div className="text-start mt-3">

          <p><b>Booking ID:</b> {booking._id}</p>
          <p><b>Listing:</b> {booking.listing?.title}</p>

          <p>
            <b>Check-in:</b>{" "}
            {new Date(booking.checkIn).toDateString()}
          </p>

          <p>
            <b>Check-out:</b>{" "}
            {new Date(booking.checkOut).toDateString()}
          </p>

          <p>
            <b>Total Paid:</b>{" "}
            ₹{booking.totalPrice}
          </p>

          <p>
            <b>Status:</b>{" "}
            <span className="badge bg-success">Confirmed</span>
          </p>

        </div>

        <hr />

        {/* ACTION BUTTONS */}
        <div className="d-flex justify-content-center gap-3 mt-3">

          <Link
            to={`/listings/${booking.listing?._id}`}
            className="btn btn-outline-dark"
          >
            View Listing
          </Link>

          <Link
            to="/"
            className="btn btn-dark"
          >
            Go to Home
          </Link>

        </div>

      </div>

    </div>
  );
}

export default BookingSuccess;
