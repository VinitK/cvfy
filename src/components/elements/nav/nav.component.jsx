import React from 'react';

import './nav.styles.css';

const NavComp = () => {
    return (
        <div className="Nav">
            <ul>
                <li>
                    <a href='/resumes'>Resumes</a>
                </li>
                <li>
                    <a href='/hire'>Hire</a>
                </li>
                <li>
                    <a href='/login'>Login</a>
                </li>
            </ul>
        </div>
    );
};

export default NavComp;