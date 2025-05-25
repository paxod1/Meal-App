import { useEffect, useState } from "react";
import { fetchCategories } from "../services/mealApi";  // axios-based API call
import "./Sidebar.css";

const Sidebar = ({ onChooseCategory, showSidebar }) => {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCat, setSelectedCat] = useState("");

  useEffect(() => {
   
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategoryList(data.categories || []);
        const firstCategory = data.categories?.[0]?.strCategory || "";
        setSelectedCat(firstCategory);
        onChooseCategory(firstCategory);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    getCategories();
  }, [onChooseCategory]);

  const handleCategoryClick = (categoryName) => {
    setSelectedCat(categoryName);
    onChooseCategory(categoryName);
  };

  return (
    <div className="sidebar-main-section">
      <div className={`sidebar-container ${showSidebar ? "show" : "hide"}`}>
        <h2 className="sidebar-title">Category List</h2>
        {categoryList.map((category) => (
          <button
            key={category.idCategory}
            className={`sidebar-button ${selectedCat === category.strCategory ? "selected" : ""}`}
            onClick={() => handleCategoryClick(category.strCategory)}
          >
            {category.strCategory}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
