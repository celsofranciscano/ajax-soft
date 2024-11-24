// src/components/Navbar/Navbar.jsx
import React from 'react';
import './Navbar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">MiLogo</a>
      </div>
      <ul className="navbar-links">
        <li><a href="/home">Inicio</a></li>
        <li><a href="/about">Acerca</a></li>
        <li><a href="/contact">Contacto</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
