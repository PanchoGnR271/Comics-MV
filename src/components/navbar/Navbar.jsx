import "./Navbar.css";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from "../CartContext/CartContext";
import ImgProfile from '../../assets/profile.png';
import { useAuth } from "../AuthContext/AuthContext";
import { useSearch } from "../SearchContext/SearchContext";

const Navbar = () => {
  const { searchTerm, setSearchTerm } = useSearch();
  const [showInput, setShowInput] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate("/search");
      setMenuOpen(false);
    }
  };

  const { user, logout } = useAuth();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = () => {
    logout();
    navigate("/");
  };

  const { cart } = useCart();
  const subTotal = cart.reduce((acc, product) => acc + product.quantity, 0);

  return (
    <section className="header">
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <i className="fa-solid fa-bars"></i>
      </button>

      <Link to="/" className="logo">
        <img src={ImgProfile} alt="Logo" className="MV" />
      </Link>

      <nav className={`side-menu ${menuOpen ? "open" : ""}`}>
        <button className="close-button" onClick={() => setMenuOpen(false)}>
         <i className="fa-solid fa-xmark"></i>
        </button>
        <form onSubmit={handleSubmit} className="menu-search-form">
         <input
            type="text"
            placeholder="Buscar cómic o manga"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
        <button type="submit">
      <i className="fa-solid fa-magnifying-glass"></i>
    </button>
  </form>
  <ul>
    <li><Link to="/mangas" onClick={() => setMenuOpen(false)}>Mangas</Link></li>
    <li><Link to="/comics" onClick={() => setMenuOpen(false)}>Comics</Link></li>
  </ul>
</nav>

{/* Menú horizontal normal */}
<nav className="navbar desktop-menu">
  <ul className="nav-links">
    <li><Link to="/mangas">Mangas</Link></li>
    <li><Link to="/comics">Comics</Link></li>
  </ul>
</nav>

      <div className='icons'>
        <form onSubmit={handleSubmit} className="search-form">
          {showInput && (
            <input
              type="text"
              placeholder="Buscar cómic o manga"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          )}
          <button
            type="button"
            className="search-button"
            onClick={() => setShowInput(!showInput)}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>

        <Link to="/cart" className='icon-button'>
          <i className="fa-solid fa-cart-shopping"></i>
          <span className="counter">{subTotal}</span>
        </Link>
      </div>

      <div className="login">
        {user ? (
          <div>
            <p>Bienvenido, {user.email}</p>
            <button className="login-btn" onClick={handleLogoutClick}>Cerrar sesión</button>
          </div>
        ) : (
          <div>
            <p>No has iniciado sesión</p>
            <button className="login-btn" onClick={handleLoginClick}>Iniciar sesión</button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Navbar;