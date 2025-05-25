import { useEffect, useState } from "react";
import MealDetails from "../components/MealDetails";
import { FaTrash } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { fetchMealDetails } from "../services/mealApi";
import "./Favorites.css";

const Favorites = () => {
  const [favoriteList, setFavoriteList] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);

  // collecting all favourite meals
  useEffect(() => {
    const storedFavorites = sessionStorage.getItem("favouriteMeals");
    if (storedFavorites) {
      setFavoriteList(JSON.parse(storedFavorites));
    }
  }, []);

  // remove meal from favourite section
  const handleRemoveMeal = (meal) => {
    const confirmRemoval = window.confirm(
      `Are you sure you want to remove "${meal.strMeal}" from your favorites?`
    );
    if (!confirmRemoval) return;
    const updatedList = favoriteList.filter((item) => item.idMeal !== meal.idMeal);
    setFavoriteList(updatedList);
    sessionStorage.setItem("favouriteMeals", JSON.stringify(updatedList));
  };

  // calling api function to get meal details and store to state (with async/await + axios)
  const handleViewDetails = async (mealId) => {
    try {
      const response = await fetchMealDetails(mealId);
      if (response?.meals?.[0]) {
        setSelectedMeal(response.meals[0]);
      }
    } catch (error) {
      console.error("Failed to fetch meal details:", error);
    }
  };

  // get the ingredients list and save to an array to display
  const getIngredients = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const item = meal[`strIngredient${i}`];
      if (item) ingredients.push(item);
    }
    return ingredients;
  };

  return (
    <div>
      <Navbar />
      <div className="favorites-wrapper">
        <h2 className="favorites-heading"> Your Favorite Meals</h2>

        {favoriteList.length === 0 ? (
          <p className="no-favorites-message">You haven't added any favorite meals yet.</p>
        ) : (
          <div className="favorites-grid">
            {favoriteList.map((meal) => (
              <div className="favorite-card" key={meal.idMeal}>
                <img src={meal.strMealThumb} alt={meal.strMeal} className="favorite-image" />
                <h4 className="favorite-name">{meal.strMeal}</h4>
                <div className="favorite-buttons">
                  <button onClick={() => handleViewDetails(meal.idMeal)} className="btn-details">
                    View
                  </button>
                  <button onClick={() => handleRemoveMeal(meal)} className="btn-remove">
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedMeal && (
          <MealDetails
            mealDetails={selectedMeal}
            getIngredientsList={getIngredients}
            onClose={() => setSelectedMeal(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Favorites;
