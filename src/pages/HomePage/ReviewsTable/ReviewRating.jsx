import { FaRegStar } from "react-icons/fa6";

const ReviewRating = ({ count }) => {
  const totalStars = 5;

  return (
    <div>
      {[...Array(totalStars)].map((_, index) => (
        <span key={index}>
          {index < count ? (
            <FaRegStar color="gold" style={{ width: "12px", height: "12px" }} />
          ) : (
            <FaRegStar style={{ width: "12px", height: "12px" }} />
          )}
        </span>
      ))}
    </div>
  );
};

export default ReviewRating;
