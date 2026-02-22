import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

function ListingMap({ listing }) {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (!listing?.location) return;

    const { latitude, longitude, address } = listing.location;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [longitude, latitude],
      zoom: 8
    });

    new mapboxgl.Marker({ color: "#e61e4d" })
      .setLngLat([longitude, latitude])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <h6>${listing.title}</h6>
          <p>${address}</p>
          <p>You will get exact location on booking</p>
        `)
      )
      .addTo(map);

    // cleanup (VERY IMPORTANT)
    return () => map.remove();

  }, [listing]);

  return (
    <>
      <h3>Listing Location</h3>
      <div
        ref={mapContainerRef}
        style={{ height: "400px", width: "80vh"}}
        className="mt-3 rounded"
      />
    </>
  );
}

export default ListingMap;
