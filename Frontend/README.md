# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


#  Meal Finder React App

A modern meal browsing application built using React.js that allows users to explore meals by category, view detailed ingredients, and save favorites—all using TheMealDB API.

---

##  Folder Structure &  Main Components


│
├── src/
│ ├── components/ # Reusable UI components
│ │ ├── MealCard.jsx # Displays a single meal card with name, image, and favorite button
│ │ ├── MealDetails.jsx # Popup/modal showing detailed meal info and ingredients
│ │ ├── Navbar.jsx # Top navigation bar with title and toggle sidebar button
│ │ ├── Sidebar.jsx # Displays categories of meals
│ │ └── Loading.jsx # Spinner/loading indicator component
│ │
│ ├── Pages/ # Main pages of the app
│ │ ├── Home.jsx # Home page to browse meals by category and search meals
│ │ └── Favorites.jsx # Page to view and manage favorite meals
│ │
│ ├── services/ # API service functions
│ │ └── mealApi.js # Contains API calls for fetching meals and details
│ │
│ ├── App.jsx # Main app with route definitions
│ ├── App.css # Global styles
│ └── index.js # Entry point of the React application
│
└── README.md # Project documentation



## ✨ Key Features

- **Home Page**
  - Browse meals by category using the sidebar.
  - Search meals by name.
  - Click on any meal to view full recipe and ingredients.
  - Add meals to your favorite list.

- **Favorites Page**
  - View meals you've marked as favorites.
  - Remove meals from favorites anytime.
  - Favorites are saved in session storage (persist during the session).

- **Reusable Components**
  - `MealCard`: Displays individual meal details with image and favorite toggle.
  - `MealDetails`: Modal view with full recipe and ingredient list.
  - `Sidebar`: Lets users pick meal categories.
  - `Navbar`: Fixed top bar with app name and sidebar toggle.
  - `Loading`: Shows loading spinner while fetching data.

- **API Integration**
  - Uses [TheMealDB API](https://www.themealdb.com/api.php) for real-time meal data.
  - API requests are handled through the `mealApi.js` service file.








