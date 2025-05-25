import "./MealCard.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const MealCard = ({ meal, onDetail, onFavorite, isFavorite }) => (
  <div className="mealcard-container">
    <img
      src={meal.strMealThumb}
      alt='meal'
      className="mealcard-image"
    />
    <h3 className="mealcard-title">{meal.strMeal}</h3>
    <div className="mealcard-actions">
      <button onClick={() => onDetail(meal.idMeal)} className="mealcard-detail-btn">
        View Details
      </button>
      <button onClick={() => onFavorite(meal)} className={`mealcard-fav-icon-btn ${isFavorite ? "liked" : ""}`}>
        {isFavorite ? <FaHeart className="icon-heart" /> : <FaRegHeart className="icon-heart" />}
      </button>
    </div>
  </div>
);

export default MealCard;

