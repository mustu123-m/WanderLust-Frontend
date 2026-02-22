import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
function Listings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
   const search = searchParams.get("search"); 
   const category= searchParams.get("category");
    const BASE_URL=import.meta.env.VITE_BASE_URL;
    console.log(BASE_URL);
  useEffect( () => {
    if(search){
      fetch(`${BASE_URL}/listing?search=${search}`).then(res => res.json()).then(data => {
          if(category){
          setListings(data.listings.filter(listing=>listing.category==category));
        }
       else setListings(data.listings);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    }
    else{
      fetch(`${BASE_URL}/listing`).then(res => res.json()).then(data => {
          if(category){
          setListings(data.listings.filter(listing=>listing.category==category));
        }
        else setListings(data.listings);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    }
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border"></div>
      </div>
    );
  }

  return (
    
    <div className="mt-4 ml-0">

    
     <div className="d-flex justify-content-between align-items-center px-5 mt-3 mb-3 flex-wrap">
      <a href="/" className="text-center text-dark text-decoration-none">
    <i className="fa-solid fa-globe fa-lg d-block mb-1"></i>
    <small>All</small>
  </a>

  <a href="/?category=beach" className="text-center text-dark text-decoration-none">
    <i className="fa-solid fa-umbrella-beach fa-lg d-block mb-1"></i>
    <small>Beach</small>
  </a>

  <a href="/?category=mountain" className="text-center text-dark text-decoration-none">
    <i className="fa-solid fa-mountain fa-lg d-block mb-1"></i>
    <small>Mountain</small>
  </a>

  <a href="/?category=camping" className="text-center text-dark text-decoration-none">
    <i className="fa-solid fa-campground fa-lg d-block mb-1"></i>
    <small>Camping</small>
  </a>

  <a href="/?category=city" className="text-center text-dark text-decoration-none">
    <i className="fa-solid fa-city fa-lg d-block mb-1"></i>
    <small>City</small>
  </a>

  <a href="/?category=hotel" className="text-center text-dark text-decoration-none">
    <i className="fa-solid fa-hotel fa-lg d-block mb-1"></i>
    <small>Hotel</small>
  </a>

  <a href="/?category=villa" className="text-center text-dark text-decoration-none">
    <i className="fa-solid fa-house-chimney fa-lg d-block mb-1"></i>
    <small>Villa</small>
  </a>

  <a href="/?category=farm" className="text-center text-dark text-decoration-none">
    <i className="fa-solid fa-seedling fa-lg d-block mb-1"></i>
    <small>Farm</small>
  </a>
      </div>

      {/* Listings Grid */}
      <div className="row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 g-4">

        {listings?.map(listing => (
            <Link
  to={`/listings/${listing._id}`}
  className="text-decoration-none text-dark"  key={listing._id}
>
          <div className="col">
            
              <div className="card h-100 listing-card">

                <img
                  src={listing.images?.[0]?.url}
                  className="card-img-top"
                  alt="listing"
                  style={{ height: "18rem", objectFit: "cover" }}
                />

                <div className="card-body">
                  <p className="card-text">
                    <b>{listing.title}</b>
                    <br />
                    Price: ₹{listing.price}/night
                  </p>
                </div>

              </div>
          </div>
          </Link>
        ))}

      </div>
    </div>
  );
}

export default Listings;
