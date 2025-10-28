import React from "react";
import { FiStar } from "react-icons/fi";

const StarRating = ({ rating, size = "text-[10px]" }) => {
  return (
    <div className="flex items-center space-x-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <FiStar
          key={star}
          className={`${size} ${
            star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
};

export default StarRating;