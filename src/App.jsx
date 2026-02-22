import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./pages/navbar";
import Footer from "./pages/Footer"
import Listings from "./pages/listings";
import ListingDetails from "./pages/ListingDetails";
import NewListingForm from "./pages/NewListing"
import ListingEditForm from "./pages/ListingEdit"
import Login from "./pages/Login";
import Signup from "./pages/signup";
import { getCurrentUser } from "./services/auth";
import "./App.css";
import { Navigate } from "react-router-dom";
import Payment from "./pages/Payment";
import BookingSuccess from "./pages/BookingSuccess";
import MyListings from "./pages/MyListings";
import MyBookings from "./pages/MyBookings";
function ProtectedRoute({ currentUser, children }) {
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [flash, setFlash] = useState(null);
  useEffect(() => {
    getCurrentUser().then(data => {
     console.log(data.user);
      setCurrentUser(data.user);
      setLoading(false);
    });
  }, []);
  useEffect(() => {
  if (!flash) return;
  const timer = setTimeout(() => setFlash(null), 3000);
  return () => clearTimeout(timer);
}, [flash]);

  if (loading) return null; // prevent flicker

  return (
    <>
        <div className="app-wrapper">

    {flash && (
  <div className={`alert alert-${flash.type} flash`}>
    {flash.message}
  </div>
   )}

      <Navbar
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      setFlash={setFlash}/>
     <main className="main-content">
      <Routes>
        <Route path="/" element={<Listings currentUser={currentUser} setFlash={setFlash}/>} />
        <Route path="/listings/:id" element={<ListingDetails currentUser={currentUser}  setFlash={setFlash}/>} />
        <Route path="/listing/new" element={
         <ProtectedRoute currentUser={currentUser}>
      <NewListingForm
        currentUser={currentUser}
        setFlash={setFlash}
      />
    </ProtectedRoute>}/>
     <Route path="/listing/edit" element={
         <ProtectedRoute currentUser={currentUser}>
      <ListingEditForm
        currentUser={currentUser}
        setFlash={setFlash}
      />
    </ProtectedRoute>}/>
        <Route
          path="/login"
          element={<Login setCurrentUser={setCurrentUser} setFlash={setFlash} />}
        />
        <Route
          path="/signup"
          element={<Signup setCurrentUser={setCurrentUser} setFlash={setFlash} />}
        />
         <Route path="/payment" element={<Payment />} />
         <Route
  path="/booking/:bookingId/success"
  element={<BookingSuccess setFlash={setFlash}/>}
/>
<Route path="/my-listings" element={<MyListings />} />
<Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
      </main>
      <Footer/>
      </div>
    </>
  );
}

export default App;
