import React from 'react';

import './footer.styles.css';
import H2Comp from '../../elements/h2/h2.component';
import H5Comp from '../../elements/h5/h5.component';

const FooterComp = () => {
    return (
        <div className="Footer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 220 1350 70">
                <path fill="rgb(220, 220, 220)" fillOpacity="1" d="M0,224L120,234.7C240,245,480,267,720,277.3C960,288,1200,288,1320,288L1440,288L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path>
            </svg>
            <div className="box">
                <div className="content">
                    <H5Comp>Project developed by</H5Comp>
                    <H2Comp>Vinit Khandelwal</H2Comp>
                </div>
            </div>
        </div>
    );
};

export default FooterComp;