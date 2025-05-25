import "./MealDetails.css";
import { AiOutlineClose } from "react-icons/ai";


const MealDetails = ({ mealDetails, getIngredientsList, onClose }) => {
  if (!mealDetails) return null;

  return (
    <div className="mealdetails-modal">
      <button className="mealdetails-close" onClick={onClose}>
        <AiOutlineClose size={24} />
      </button>

      <h2 className="mealdetails-title">{mealDetails.strMeal}</h2>
      <img
        className="mealdetails-image"
        src={mealDetails.strMealThumb}
        alt={mealDetails.strMeal}
      />
      <h3 className="mealdetails-subtitle">Ingredients:</h3>
      <ul className="mealdetails-ingredients">
        {getIngredientsList(mealDetails).map((ing, i) => (
          <li key={i}>{ing}</li>
        ))}
      </ul>
      <h3 className="mealdetails-subtitle">Instructions:</h3>
      <p className="mealdetails-instructions">{mealDetails.strInstructions}</p>
     

    </div>
  );
};

export default MealDetails;
