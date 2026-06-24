import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ onSearch }) => {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (onSearch) onSearch(val);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchQuery);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate("/");
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}>
        <div className="navbar__container">
          {/* Logo */}
          <Link to="/" className="navbar__logo">
            <div className="navbar__logo-icon">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="20" fill="#FC8019" />
                <path
                  d="M12 28C12 28 13 18 20 14C27 10 28 20 28 20"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle cx="20" cy="22" r="4" fill="white" />
              </svg>
            </div>
            <span className="navbar__logo-text">swiggy</span>
          </Link>

          {/* Location */}
          <div className="navbar__location">
            <button className="navbar__location-btn">
              <span className="navbar__location-city">Gurugram</span>
              <svg className="navbar__location-arrow" viewBox="0 0 24 24" fill="none">
                <path d="M6 9l6 6 6-6" stroke="#FC8019" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="navbar__location-address">DLF Phase 1, Sector 26</span>
          </div>

          {/* Desktop Search */}
          <form className="navbar__search" onSubmit={handleSearchSubmit}>
            <div className={`navbar__search-wrap ${isSearchFocused ? "navbar__search-wrap--focused" : ""}`}>
              <svg className="navbar__search-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="#686b78" strokeWidth="2" />
                <path d="M21 21l-4.35-4.35" stroke="#686b78" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="Search for restaurants and food"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="navbar__search-input"
              />
            </div>
          </form>

          {/* Nav Actions */}
          <div className="navbar__actions">
            {/* Mobile Search Toggle */}
            <button
              className="navbar__mobile-search-btn"
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              aria-label="Search"
            >
              <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
                <circle cx="11" cy="11" r="8" stroke="#3d4152" strokeWidth="2" />
                <path d="M21 21l-4.35-4.35" stroke="#3d4152" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            {/* Offers */}
            <Link to="/" className="navbar__action-link">
              <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
                <path d="M9 22L3 12l6-10h6l6 10-6 10H9z" stroke="#3d4152" strokeWidth="1.8" strokeLinejoin="round" />
                <path d="M9 12h6M12 9v6" stroke="#3d4152" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <span>Offers</span>
            </Link>

            {/* Help */}
            <Link to="/" className="navbar__action-link navbar__action-link--hide-sm">
              <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
                <circle cx="12" cy="12" r="10" stroke="#3d4152" strokeWidth="1.8" />
                <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" stroke="#3d4152" strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="12" cy="17" r="0.5" fill="#3d4152" stroke="#3d4152" />
              </svg>
              <span>Help</span>
            </Link>

            {/* User */}
            <div className="navbar__user" ref={userMenuRef}>
              <button
                className="navbar__action-link"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                {user ? (
                  <div className="navbar__avatar">{user.avatar}</div>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="#3d4152" strokeWidth="1.8" strokeLinecap="round" />
                    <circle cx="12" cy="7" r="4" stroke="#3d4152" strokeWidth="1.8" />
                  </svg>
                )}
                <span>{user ? user.name.split(" ")[0] : "Sign In"}</span>
              </button>

              {showUserMenu && (
                <div className="navbar__user-menu">
                  {user ? (
                    <>
                      <div className="navbar__user-info">
                        <div className="navbar__user-avatar-lg">{user.avatar}</div>
                        <div>
                          <div className="navbar__user-name">{user.name}</div>
                          <div className="navbar__user-email">{user.email}</div>
                        </div>
                      </div>
                      <div className="navbar__user-divider" />
                      <Link to="/" className="navbar__user-item" onClick={() => setShowUserMenu(false)}>
                        <span>🛍️</span> My Orders
                      </Link>
                      <Link to="/" className="navbar__user-item" onClick={() => setShowUserMenu(false)}>
                        <span>❤️</span> Favourites
                      </Link>
                      <Link to="/" className="navbar__user-item" onClick={() => setShowUserMenu(false)}>
                        <span>💳</span> Payments
                      </Link>
                      <div className="navbar__user-divider" />
                      <button className="navbar__user-item navbar__user-logout" onClick={handleLogout}>
                        <span>🚪</span> Logout
                      </button>
                    </>
                  ) : (
                    <div className="navbar__user-signin">
                      <p>Sign in to access your orders, favorites, and more!</p>
                      <Link to="/" className="navbar__signin-btn" onClick={() => setShowUserMenu(false)}>
                        Sign In
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Cart */}
            <Link to="/checkout" className="navbar__cart">
              <div className="navbar__cart-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="#FC8019" strokeWidth="2" strokeLinejoin="round" />
                  <line x1="3" y1="6" x2="21" y2="6" stroke="#FC8019" strokeWidth="2" />
                  <path d="M16 10a4 4 0 01-8 0" stroke="#FC8019" strokeWidth="2" strokeLinecap="round" />
                </svg>
                {totalItems > 0 && (
                  <span className="navbar__cart-badge">{totalItems}</span>
                )}
              </div>
              <span className="navbar__cart-label">Cart</span>
            </Link>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isMobileSearchOpen && (
          <div className="navbar__mobile-search">
            <form onSubmit={handleSearchSubmit}>
              <div className="navbar__search-wrap navbar__search-wrap--focused">
                <svg className="navbar__search-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="8" stroke="#686b78" strokeWidth="2" />
                  <path d="M21 21l-4.35-4.35" stroke="#686b78" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <input
                  type="text"
                  placeholder="Search for restaurants and food"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  autoFocus
                  className="navbar__search-input"
                />
              </div>
            </form>
          </div>
        )}
      </nav>
      {/* Spacer so content doesn't hide under sticky nav */}
      <div className="navbar__spacer" />
    </>
  );
};

export default Navbar;