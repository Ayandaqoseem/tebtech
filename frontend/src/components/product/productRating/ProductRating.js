import React from "react";
import StarRatings from "react-star-ratings"; 

export default function ProductRating ({ averageRating, noOfRatings }) {
  return (
    <>
      {averageRating > 0 && (
        <>
          <StarRatings
            starDimension="20px"
            starSpacing="2px"
            starRatedColor="#F6B01E"
            rating={averageRating}
            editing={false}
          />
          ({noOfRatings})
        </>
      )}
    </>
  );
};


