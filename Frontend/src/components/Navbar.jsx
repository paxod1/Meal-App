import "./Navbar.css";
import { FaBars } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

function Navbar({ toggleSidebar }) {

    const location = useLocation();
    const showMenuIcon = location.pathname === "/";

    return (
        <nav className="navbar-container">
            <div className="navbar-left">
                <h1 className="navbar-logo">MealApp</h1>
            </div>

            <div className="navbar-right">
                <Link to="/" className="navbar-fav-btn">
                    Home
                </Link>
                <Link to="/favorites" className="navbar-fav-btn">
                    My Favorites
                </Link>
                {showMenuIcon && (
                    <button className="navbar-menu" onClick={toggleSidebar} aria-label="Open menu">
                        <FaBars size={24} />
                    </button>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
