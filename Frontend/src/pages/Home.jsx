import { useEffect, useState } from "react";
import { fetchMealsByCategory, fetchMealDetails } from "../services/mealApi";
import Sidebar from "../components/Sidebar";
import MealCard from "../components/MealCard";
import MealDetails from "../components/MealDetails";
import Navbar from "../components/Navbar";
import "./Home.css";
import Loading from "../components/Loading";
import { FaSearch } from "react-icons/fa";


const HomePage = () => {
  const [mealList, setMealList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  var [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("");

  // load favourite meals from session storage or empty array
  const [favouriteMeals, setFavouriteMeals] = useState(() => {
    const saved = sessionStorage.getItem("favouriteMeals");
    return saved ? JSON.parse(saved) : [];
  });

  // fetch meals by selected category with category changes depend
  useEffect(() => {
    setLoading(true)
    const fetchMeals = async () => {
      if (selectedCategory) {

        try {
          const response = await fetchMealsByCategory(selectedCategory);
          if (response.meals) {
            setIsSidebarVisible(false)
            setMealList(response.meals);
            setSelectedMeal(null);
            setLoading(false)

          }
        } catch (error) {
          console.error("Failed to fetch meals by category:", error);
        }
      }
    };

    fetchMeals();
  }, [selectedCategory]);

  // add or remove meal from favourites with confirmation 
  const toggleFavouriteMeal = (meal) => {
    const alreadyLiked = favouriteMeals.find((item) => item.idMeal === meal.idMeal);
    if (alreadyLiked) {
      const confirmRemoval = window.confirm(
        `Meal is Already Added To favorite. Are you sure you want to remove "${meal.strMeal}" from favourites?`
      );
      if (!confirmRemoval) return;

      const updatedList = favouriteMeals.filter((item) => item.idMeal !== meal.idMeal);
      setFavouriteMeals(updatedList);
      sessionStorage.setItem("favouriteMeals", JSON.stringify(updatedList));
    } else {
      const updatedList = [...favouriteMeals, meal];
      setFavouriteMeals(updatedList);
      sessionStorage.setItem("favouriteMeals", JSON.stringify(updatedList));
    }
  };

  // fetch detailed information of a meal by meal ID and update state
  const showMealDetails = async (mealId) => {
    try {
      const response = await fetchMealDetails(mealId);
      if (response?.meals?.[0]) {
        setSelectedMeal(response.meals[0]);
      }
    } catch (error) {
      console.error("Failed to fetch meal details:", error);
    }
  };

  // close the meal details popup by clearing selected meal
  const closeMealPopup = () => {
    setSelectedMeal(null);
  };

  // get the ingredients list and save to an array to display
  const extractIngredients = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ing = meal[`strIngredient${i}`];
      if (ing) ingredients.push(ing);
    }
    return ingredients;
  };

  // not show defalut the side bar in small screen
  function showSidebar() {
    setIsSidebarVisible(!isSidebarVisible)
  }

  //search meals based on there name
  const filteredMeals = mealList.filter((meal) =>
    meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="HomePageWrapper">


      <div>
        <Navbar toggleSidebar={() => { setIsSidebarVisible(!isSidebarVisible) }} />

        <div className="HomePageContent">
          <Sidebar
            onChooseCategory={setSelectedCategory}
            showSidebar={isSidebarVisible}
          />
          <div className="SearchBarWrapper">
            <div className="SearchBarWithIcon">
              <input
                type="text"
                className="MealSearchInput"
                placeholder="Search meals by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="SearchIcon">
                <FaSearch style={{ color: '#2b615b' }} />
              </span>
            </div>
          </div>



          {
            loading ? <Loading /> : <div className="HomePageMealArea">
              <div className="HomePageMealList">
                {filteredMeals.length === 0 ? (
                  <div>Sorry! No meal found with that name.</div>
                ) : (
                  filteredMeals.map((meal) => (
                    <MealCard
                      key={meal.idMeal}
                      meal={meal}
                      onDetail={() => showMealDetails(meal.idMeal)}
                      onFavorite={() => toggleFavouriteMeal(meal)}
                      isFavorite={favouriteMeals.some((item) => item.idMeal === meal.idMeal)}
                    />
                  ))
                )}

              </div>
            </div>
          }


          {selectedMeal && (
            <MealDetails
              mealDetails={selectedMeal}
              getIngredientsList={extractIngredients}
              onClose={closeMealPopup}
            />
          )}
        </div>
      </div>


    </div>
  );
};

export default HomePage;
