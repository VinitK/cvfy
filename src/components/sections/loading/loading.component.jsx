import React from 'react';

import './loading.styles.css';

const LoadingComp = () => {
    return (
        <div className="Loading frow">
            <div className="image-block fcol">
                <div className="ph-image"></div>
            </div>
            <div className="text-block fcol">
                <div className="ph-title"></div>
                <div className="ph-subtitle"></div>
                <div className="ph-subtitle-end"></div>
                <div className="ph-btn"></div>
            </div>
            {/* <div className="shine-animation"></div> */}
        </div >
    );
};

export default LoadingComp;