import React from 'react';

import './button-link.styles.css';

const ButtonLinkComp = ({ href, className, children, ...rest }) => {
    return (
        <div className='ButtonLink'>
            <a href={href} className={`${className}`} {...rest}>{children}</a>
        </div >
    );
};

export default ButtonLinkComp;

// Creates a button
// If prop customClass is passed with value as follows:
// onHoverHighLight3: on Hover changes color to Highlight 3
// Prop href for href of anchor tag
// Prop children for text of button