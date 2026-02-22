import { useState } from "react";

function ReviewForm({listingId, setFlash,onReviewAdded}) {
  const [rating, setRating] = useState(2);
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);
   const BASE_URL=import.meta.env.VITE_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `${BASE_URL}/listing/${listingId}/review`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({review:
            { rating, comment }}

        )
      }
    );

    const data = await res.json();
    if (!data.success) {
      setFlash({
        type:"danger",
        message:data.message
    });
        console.log("flashiing");
        return;
    }
    setComment("");
    setRating(5);
    onReviewAdded(data.review);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">

      <fieldset className="starability-slot">
  <legend>First rating:</legend>
  <input type="radio" id="no-rate" className="input-no-rate" name="review[rating]" value="1" aria-label="No rating." onChange={()=>setRating(1)} />
  <input type="radio" id="second-rate1" name="review[rating]" value="1" onChange={()=>setRating(2)} />
  <label htmlFor="second-rate1" title="Terrible" >1 star</label>
  <input type="radio" id="second-rate2" name="review[rating]" onChange={()=>setRating(2)} value="2" />
  <label htmlFor="second-rate2" title="Not good">2 stars</label>
  <input type="radio" id="second-rate3" name="review[rating]" value="3" onChange={()=>setRating(3)}/>
  <label htmlFor="second-rate3" title="Average">3 stars</label>
  <input type="radio" id="second-rate4" name="review[rating]" value="4" onChange={()=>setRating(4)} />
  <label htmlFor="second-rate4" title="Very good">4 stars</label>
  <input type="radio" id="second-rate5" name="review[rating]" value="5" onChange={()=>setRating(5)}/>
  <label htmlFor="second-rate5" title="Amazing">5 stars</label>
</fieldset>

      <div className="mb-3">
        <label className="form-label">Comment</label>
        <textarea
          className="form-control"
          value={comment}
          required
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <button className="btn btn-dark">Add Review</button>
    </form>
  );
}
export default ReviewForm;
