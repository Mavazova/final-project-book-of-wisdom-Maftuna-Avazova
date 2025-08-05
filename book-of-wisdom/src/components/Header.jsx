
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


import './header.css'; 

function Header() {
  const { username, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="header">
      <h1>📚 Book of Wisdom</h1>
      <nav className="nav">
        <NavLink to="/" className="nav-link">Home</NavLink>
        <NavLink to="/quotes" className="nav-link">Quotes</NavLink>
        <NavLink to="/reflections" className="nav-link">Reflections</NavLink>
        <NavLink to="/about" className="nav-link">About</NavLink>

        {username ? (
          <>
            <span style={{ marginLeft: "1rem" }}>Welcome, {username}</span>
            <button onClick={handleLogout} className="nav-link">Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="nav-link">Login</NavLink>
            <NavLink to="/signup" className="nav-link">Sign Up</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
