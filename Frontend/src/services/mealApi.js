import axios from "axios";

// Access the base URL from environment variable
const BASE_URL = import.meta.env.VITE_API_BASE_URL

// api to get all categories list
export const fetchCategories = async () => {
  const response = await axios.get(`${BASE_URL}/categories.php`);
  return response.data;
};

// api to get category by meals
export const fetchMealsByCategory = async (category) => {
  const response = await axios.get(`${BASE_URL}/filter.php`, {
    params: { c: category },
  });
  return response.data;
};

// api to get per meal details
export const fetchMealDetails = async (id) => {
  const response = await axios.get(`${BASE_URL}/lookup.php`, {
    params: { i: id },
  });
  return response.data;
};




