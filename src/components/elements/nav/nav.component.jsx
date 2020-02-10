import React from 'react';
import { Link } from 'react-router-dom';

import './nav.styles.css';

const NavComp = () => {
    return (
        <div className="Nav">
            <nav>
                <Link to="/loading" className="standard-button">Loading</Link>
                <Link to="/resumes" className="standard-button">Resumes</Link>
                <Link to="/hire" className="standard-button">Hire</Link>
                <Link to="/cv/vinit" className="standard-button">My CV</Link>
                <Link to="/login" className="standard-button">Login</Link>
            </nav>
        </div>
    );
};

export default NavComp;