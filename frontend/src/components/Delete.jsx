import { useState } from "react";

const Delete = () => {
  const [review, setReview] = useState([
    { author: "razak", rating: 5, text: "good" },
    { author: "mazak", rating: 2, text: "bad" },
  ]);

  return (
    <>
      {review.map((review, id) => (
        <div key={id} style={{ backgroundColor: "black", color: "silver" }}>
          <h1> {review.author} </h1>
          <h1> {review.rating} </h1>
          <h1> {review.text} </h1>
        </div>
      ))}
    </>
  );
};
export default Delete;
