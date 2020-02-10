import React from 'react';

import './footer.styles.css';
import LogoComp from '../../elements/logo/logo.component';
import H3Comp from '../../elements/h3/h3.component';
import H5Comp from '../../elements/h5/h5.component';

const FooterComp = () => {
    return (
        <div className="Footer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 220 1350 70">
                <path fill="rgb(220, 220, 220)" fillOpacity="1" d="M0,224L120,234.7C240,245,480,267,720,277.3C960,288,1200,288,1320,288L1440,288L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path>
            </svg>
            <div className="box">
                <div className="content row">
                    <div className="credit col">
                        <span><LogoComp className="h3" /></span>
                        <H5Comp>Project developed by</H5Comp>
                        <H3Comp className="bold"><a className="unlink onHoverHighLight3" href="https://www.linkedin.com/in/khandelwalvinit/">Vinit Khandelwal</a></H3Comp>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FooterComp;