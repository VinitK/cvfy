import React from 'react';
import { Link } from 'react-router-dom';

import './navbar.styles.css'

import LogoComp from '../../elements/logo/logo.component';

function NavbarComp() {
    return (
        <div className="Navbar">
            <div className="sticky">
                <div className="content">
                    <div className="logo">
                        <LogoComp className='light-logo h3' />
                    </div>
                    <nav className="nav">
                        <Link to="/" className="nav-element onHoverBGHighLight3">Home</Link>
                        <Link to="/loading" className="nav-element onHoverBGHighLight3">Loading</Link>
                        <Link to="/resumes" className="nav-element onHoverBGHighLight3">Resumes</Link>
                        <Link to="/hire" className="nav-element onHoverBGHighLight3">Hire</Link>
                        <Link to="/cv/vinit" className="nav-element onHoverBGHighLight3">My CV</Link>
                        <Link to="/auth" className="nav-element onHoverBGHighLight3">Sign in</Link>
                    </nav>
                </div>
            </div>
            <div className="non-sticky"></div>
        </div>
    );
}

export default NavbarComp;