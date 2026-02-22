import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

 const BASE_URL=import.meta.env.VITE_BASE_URL;

function MyListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/my-listings`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        setListings(data.listings || []);
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
      <h3 className="mb-4">My Listings</h3>

      {listings.length === 0 && (
        <p>You haven’t created any listings yet.</p>
      )}

      <div className="row row-cols-md-3 g-4">
        {listings.map(listing => (
          <div className="col" key={listing._id}>
            <div className="card h-100">

              <img
                src={listing.images?.[0]?.url}
                className="card-img-top"
                style={{ height: "180px", objectFit: "cover" }}
              />

              <div className="card-body">
                <h6>{listing.title}</h6>
                <p>₹{listing.price} / night</p>

                <Link
                  to={`/listings/${listing._id}`}
                  className="btn btn-sm btn-outline-dark"
                >
                  View
                </Link>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyListings;
