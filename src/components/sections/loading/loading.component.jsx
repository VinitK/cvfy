import React from 'react';

import './loading.styles.css';

const LoadingComp = () => {
    return (
        <div className="Loading">
            <div className="content">
                <div className="placeholder-image-block">
                    <div className="placeholder-image"></div>
                </div>
                <div className="placeholder-text-block">
                    <div className="placeholder-title"></div>
                    <div className="placeholder-subtitle"></div>
                    <div className="placeholder-subtitle-end"></div>
                    <div className="placeholder-btn"></div>
                </div>
                <div className="shine-animation"></div>
            </div>
        </div >
    );
};

export default LoadingComp;