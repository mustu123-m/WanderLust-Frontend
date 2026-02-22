import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../services/auth";

function Navbar({ currentUser, setCurrentUser }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    setCurrentUser(null);
    navigate("/");
  };

  return (
   <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
    <link href="https://api.mapbox.com/mapbox-gl-js/v3.12.0/mapbox-gl.css" rel="stylesheet"/>
<script src="https://api.mapbox.com/mapbox-gl-js/v3.12.0/mapbox-gl.js"></script>
<link
  href="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css"
  rel="stylesheet"
/>

<link
  rel="stylesheet"
  href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.css"
/>

<script src="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js"></script>

<script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.min.js"></script>
  
  <div className="container-fluid">
    <Link className="navbar-brand" to="/listing">
    <i className="fa-solid fa-compass"></i>
    <span className="visually-hidden">Home</span>
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse ms-auto" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/">All Listings</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/listing/new">Add new Listing</Link>
        </li>
      </ul>
    </div>
    <div className="search-bar ms-auto" id="navbarNav ">
      <form method="get" action="/"  className="d-flex" role="search">
      <input className="form-control me-2 bar-search" type="search" name="search" placeholder="Search" aria-label="Search"/>
      <button className="btn search-btn" type="submit">Search</button>
    </form>
    </div>
    <div className="collapse navbar-collapse loginbar ms-auto" id="navbarNav">
      <ul className="navbar-nav">
          {!currentUser &&
          <>
        <li className="nav-item">

          <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="signup">Signup</Link>
        </li>
        </>
        }
        
   {/* LOGGED IN */}
            {currentUser && (
              <li className="nav-item dropdown">

                <button
                  className="btn btn-outline-dark dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  <i className="fa-solid fa-user me-1"></i>
                  {currentUser.username}
                </button>

                <ul className="dropdown-menu dropdown-menu-end">

                  <li>
                    <Link className="dropdown-item" to="/my-listings">
                      <i className="fa-solid fa-house me-2"></i>
                      My Listings
                    </Link>
                  </li>

                  <li>
                    <Link className="dropdown-item" to="/my-bookings">
                      <i className="fa-solid fa-calendar-check me-2"></i>
                      My Bookings
                    </Link>
                  </li>

                  <li><hr className="dropdown-divider" /></li>

                  <li>
                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                      <i className="fa-solid fa-right-from-bracket me-2"></i>
                      Logout
                    </button>
                  </li>

                </ul>

              </li>
            )}
      </ul>
    </div>
  </div>
</nav>
  );
}

export default Navbar;