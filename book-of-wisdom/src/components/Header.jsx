import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css'; //  need to work on that 

function Header() {
  return (
    <header className="header">
      <h1>📚 Book of Wisdom</h1>
      <nav className="nav">
        <NavLink to="/" className="nav-link">Home</NavLink>
        <NavLink to="/quotes" className="nav-link">Quotes</NavLink>
        <NavLink to="/about" className="nav-link">About</NavLink>
      </nav>
    </header>
  );
}

export default Header;