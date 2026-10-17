import React from 'react';
import { NavLink, Link } from 'react-router-dom';

/**
 * Navbar component
 * Navigation bar containing brand title, home link, and characters link
 */
function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="nav-brand" title="Rick and Morty Explorer">
          <span className="portal-dot"></span>
          <span>Rick &amp; Morty Explorer</span>
        </Link>
        
        <ul className="nav-links">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/characters"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Characters
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
