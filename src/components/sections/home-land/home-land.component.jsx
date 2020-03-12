import React from 'react';

import './home-land.styles.css';

import HeaderComp from './header/header.component';
import ThreeCardComp from './three-card/three-card.component';

const HomeLandComp = () => {
    return (
        <div className="HomeLand">
            <HeaderComp />
            <ThreeCardComp />
        </div>
    );
};

export default HomeLandComp;