import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink
        to="/"
        end
        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
      >
        Home
      </NavLink>
      <NavLink
        to="/characters"
        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
      >
        Characters
      </NavLink>
    </nav>
  );
}

export default Navbar;
