import { useEffect, useState } from "react";
import { useParams,Link ,useNavigate} from "react-router-dom";
import  ReviewForm from "./ReviewForm";
import ListingMap from "./ListingMap";

const BASE_URL= import.meta.env.VITE_BASE_URL;
function ListingDetails({currentUser,setFlash}) {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [CheckIn,setCheckin]=useState(null);
  const [CheckOut,setCheckOut]=useState(null);


  const navigate=useNavigate();
  const bookingSumbmithandler=async (e)=>{
    e.preventDefault();
    const res=await fetch(`${BASE_URL}/listing/${id}/booking`,{
      method:"POST",
       headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
CheckIn:CheckIn,
CheckOut:CheckOut
        }
        )

    })
    const data=await res.json();
    if(data.success){
navigate('/payment',{
  state:{
  booking:data.booking,order:data.order,razorpayKey:data.razorpayKey
}})
}
else{
  setFlash({
    type:"danger",
    message:data.message
  })
}
  }
  const onDelete=async (reviewId)=>{
     const res = await fetch(
      `${BASE_URL}/listing/${id}/review/${reviewId}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
      const data= await res.json();
      if(data.success){
       var newReviews=[];
       newReviews=reviews.filter(review=>review._id!==reviewId);
       console.log("going to set reviews");
       setReviews(newReviews);
      }
      else{
        setFlash({
          type:"danger",
          message:data.message
        })
      }
  }
  const onListingDelete=async (listingId)=>{
    const res=await fetch(`${BASE_URL}/listing/${listingId}/`,{
       method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
    });
    const data=await res.json();
    if(data.success){
      setFlash({
        type:"success",
        message:data.message
      })
      navigate("/listings");
    }
    else{
      setFlash({
        type:"danger",
        message:data.message
      })
    }
  }
  const onListingEdit=()=>{
    navigate("/listing/edit",{state:{
      listingId:id
    }})
  }
  useEffect(() => {
    fetch(`${BASE_URL}/listing/${id}`)
      .then(res => res.json())
      .then(data => {
        setListing(data.listing);
        setReviews(data.listing.reviews);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border"></div>
      </div>
    );
  }

  if (!listing) {
    return <p className="text-center mt-5">Listing not found</p>;
  }

  return (
    <div className="container mt-4">

     <div className="row g-2">

  {/* Main Image */}
  <div className="col-md-6">
    <img
      src={listing.images?.[0]?.url}
      className="img-fluid rounded"
      style={{ height: "400px", width: "100%", objectFit: "cover" }}
      alt=""
    />
  </div>

  {/* Right Collage */}
  <div className="col-md-6">
    <div className="row g-2">
      {listing.images?.slice(1, 5).map((img, index) => (
        <div className="col-6" key={index}>
          <img
            src={img.url}
            className="img-fluid rounded"
            style={{ height: "195px", width: "100%", objectFit: "cover" }}
            alt=""
          />
        </div>
      ))}
    </div>
  </div>

</div>

      <div className="row">

        {/* LEFT: Listing Info */}
         <div className="col-lg-7 col-md-7 mt-2">

      <div className="card p-3">
        <h5 className="mb-2">Hosted by {listing.owner.username}</h5>

        <div className="d-flex align-items-center gap-3">

          <img src="/images/default-user.png"
               style={{width:"60px",height:"60px", borderradius:"50%",objectFit:"cover"}}/>

          <div>
            <div><b>Member since:</b> </div>
            <div><b>Contact:</b> {listing.owner.email}</div>
          </div>

        </div>

        <hr/>

        <p>
          <b>Location:</b> {listing.location.address}<br/>
          <b>Category:</b> {listing.category}
        </p>

      </div>

    </div>

        {/* RIGHT: Booking Card (UI only for now) */}
        <div className="col-lg-5">
   
          <div className="card shadow-sm p-3">
            <h5>₹{listing.price} / night</h5>
 <form onSubmit={bookingSumbmithandler}>
            <input type="date" className="form-control mb-2" onChange={(e)=>setCheckin(e.target.value)} />
            <input type="date" className="form-control mb-3" onChange={(e)=>setCheckOut(e.target.value)} />
            <button className="btn btn-dark w-100">
              Reserve
            </button>
            </form>
          </div>

        </div>
     <ReviewForm listingId={id}  setFlash={setFlash}onReviewAdded={(newReview) => {
    setReviews(prevReviews => [newReview, ...prevReviews]);
  }}/>
  {
  reviews.map(review=>(
     <div  key={review?._id} className="card col-lg-5 mb-3">
      <div className="card-body">

        <h5 className="card-title">
          {review?.author?.username || "Anonymous"}
        </h5>

        <h6 className="card-subtitle mb-2 text-muted">
          {new Date(review?.created_at).toLocaleDateString()}
        </h6>

        <p className="card-text">
          {review?.comment}
        </p>

        <p className="mb-2">
          Rating: {review?.rating} ⭐
        </p>

        {(review?.author.username==currentUser?.username) && (
          <button
            className="btn btn-sm btn-danger"
            onClick={() => onDelete(review._id)}
          >
            Delete
          </button>
        )}

      </div>
    </div>

  ))}
  {(listing?.owner.username==currentUser?.username) &&(
    <div className="mt-3">
     <button
            className="btn btn-sm btn-danger"
            onClick={() => onListingDelete(listing._id)}
          >
            Delete
          </button>
           <button
            className="btn btn-sm btn-success"
            onClick={() => onListingEdit(listing._id)}
          >
            Edit
          </button>
</div>          
  )}
  <ListingMap listing={listing}/>
      </div>

    </div>
  );
}

export default ListingDetails;
