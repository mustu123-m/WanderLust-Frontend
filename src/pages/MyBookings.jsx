import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
 const BASE_URL=import.meta.env.VITE_BASE_URL;

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/my-bookings`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        setBookings(data.bookings || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border"></div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-4">My Bookings</h3>

      {bookings.length === 0 && (
        <p>You haven’t made any bookings yet.</p>
      )}

      <div className="row row-cols-md-2 g-4">
        {bookings.map(booking => (
          <div className="col" key={booking._id}>
            <div className="card h-100">

              <img
                src={booking.listing?.images?.[0]?.url}
                className="card-img-top"
                style={{ height: "180px", objectFit: "cover" }}
              />

              <div className="card-body">
                <h6>{booking.listing?.title}</h6>

                <p className="mb-1">
                  <b>Check-in:</b>{" "}
                  {new Date(booking.checkIn).toDateString()}
                </p>

                <p className="mb-1">
                  <b>Check-out:</b>{" "}
                  {new Date(booking.checkOut).toDateString()}
                </p>

                <p>
                  <b>Total:</b> ₹{booking.totalPrice}
                </p>

                <Link
                  to={`/booking/${booking._id}/success`}
                  className="btn btn-sm btn-outline-dark"
                >
                  View Details
                </Link>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyBookings;
