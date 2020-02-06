import React from 'react';

import './navbar.styles.css'
import LogoComp from '../../elements/logo/logo.component';
import NavComp from '../../elements/nav/nav.component';

function NavbarComp() {
    return (
        <div className="Navbar">
            <div className="sticky">
                <div className="content">
                    <div className="logo">
                        <a href="/">
                            <LogoComp customClass='onHoverHighLight3 website' />
                        </a>
                    </div>
                    <div className="nav">
                        <NavComp />
                    </div>
                </div>
            </div>
            <div className="non-sticky"></div>
        </div>
    );
}

export default NavbarComp;