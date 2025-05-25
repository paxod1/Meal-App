import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import './App.css'
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <div>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
