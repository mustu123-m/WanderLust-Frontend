import { useRef } from "react";
import { useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useEffect } from "react";
import {Link, useNavigate } from "react-router-dom";
function NewListing() {
    const BASE_URL=import.meta.env.BASE_URL;
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    country: "",
    latitude: "",
    longitude: "",
    address: ""
  });
 
  const [images, setImages] = useState([]);
  const { state } = useLocation();

  if (!state) {
    return <Navigate to="/" />;
  }
  const {listingId}=state;
  const mapContainerRef=useRef();
  const navigate=useNavigate();
  useEffect(()=>{
    // default map view
const map = new mapboxgl.Map({
  container: mapContainerRef.current,
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [78.9629, 20.5937], // India approx
  zoom: 3
});

let marker;

// Add geocoder search box
const geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl,
  marker: false,
  placeholder: "Search exact address or place"
});

map.addControl(geocoder);

// When user selects a place
geocoder.on('result', (e) => {

  const lng = e.result.center[0];
  const lat = e.result.center[1];
  const address = e.result.place_name;

  // remove old marker
  if (marker) marker.remove();

  marker = new mapboxgl.Marker({ color: "red" })
    .setLngLat([lng, lat])
    .addTo(map);

setForm(prev => ({
  ...prev,
  latitude: lat,
  longitude: lng,
  address
}));

});
  },[]);
  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Handle image files
  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(form).forEach(key => {
      formData.append(key, form[key]);
    });

    images.forEach(img => {
      formData.append("images", img);
    });

    const res = await fetch(`${BASE_URL}/listing/${listingId}`, {
      method: "PATCH",
      credentials: "include",
      body: formData
    });

    const data = await res.json();

    if (!data.success) {
      alert(data.message || "Failed to create listing");
      navigate("/");
      return;
    }

    alert("Listing Edited successfully");
  };

  return (
    <div className="row">
      <div className="col-8">

        <form
          onSubmit={handleSubmit}
          className="needs-validation"
          noValidate
        >

          {/* TITLE */}
          <div className="mb-3 mt-2 offset-2">
            <label className="form-label">Title:</label>
            <input
              type="text"
              name="title"
              className="form-control"
              required
              value={form.title}
              onChange={handleChange}
            />
          </div>

          {/* IMAGES */}
          <div className="mb-3 offset-2">
            <label className="form-label">Images:</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
          </div>

          {/* PRICE */}
          <div className="mb-3 offset-2">
            <label className="form-label">Price:</label>
            <input
              type="text"
              name="price"
              className="form-control"
              required
              value={form.price}
              onChange={handleChange}
            />
          </div>

          {/* CATEGORY */}
          <div className="mb-3 offset-2">
            <label className="form-label">Category:</label>
            <select
              name="category"
              className="form-select"
              required
              value={form.category}
              onChange={handleChange}
            >
              <option value="">Select category</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="villa">Villa</option>
              <option value="hotel">Hotel</option>
              <option value="beach">Beachfront</option>
              <option value="mountain">Mountain</option>
              <option value="camping">Camping / Tent</option>
              <option value="cabin">Cabin</option>
              <option value="treehouse">Treehouse</option>
              <option value="lake">Lake Stay</option>
              <option value="farm">Farm Stay</option>
              <option value="city">City Stay</option>
              <option value="luxury">Luxury</option>
              <option value="heritage">Heritage</option>
            </select>
          </div>

          {/* MAP PLACEHOLDER */}
         <div
        ref={mapContainerRef}
        style={{ height: "400px", width: "80vh"}}
        className="mt-3 rounded map mb-3 offset-2"
      />

          {/* COUNTRY */}
          <div className="mb-3 offset-2">
            <label className="form-label">Country:</label>
            <input
              type="text"
              name="country" 
              className="form-control"
              required
              value={form.country}
              onChange={handleChange}
            />
          </div>
         
          {/* HIDDEN LOCATION FIELDS */}
          <input type="hidden" name="latitude" value={form.latitude} />
          <input type="hidden" name="longitude" value={form.longitude} />
          <input type="hidden" name="address" value={form.address} />

          <button type="submit" className="btn btn-dark offset-2">
            Edit
          </button>

        </form>
      </div>
    </div>
  );
}

export default NewListing;
