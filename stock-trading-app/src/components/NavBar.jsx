import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'; //  CSS file for styling

const NavBar = () => (
    <nav className="navbar">
        <div className="navbar__logo">
            <img src="logo.svg" alt="Arrow" />
        </div>
        <div className="navbar__links">
            <Link to="/portfolio">Portfolio</Link>
            <Link to="/research">Research</Link>
            <Link to="/invest">Invest</Link>
        </div>
    </nav>
);

export default NavBar;
