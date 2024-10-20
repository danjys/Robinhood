import React from 'react';
import './NavBar.css'; // Assuming you're creating a CSS file for it

const NavBar = () => (
    <nav className="navbar">
        <div className="navbar__logo">
            <img src="logo.svg" alt="Arrow" />
        </div>
        <div className="navbar__links">
            <a href="#dashboard">Dashboard</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#account">Account</a>
        </div>
    </nav>
);

export default NavBar;
