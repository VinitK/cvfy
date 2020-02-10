import React from 'react';

import './button.styles.css';

const ButtonComp = ({ type, className, loading, children, ...rest }) => {
    return (
        <div className='Button'>
            <button type={type} disabled={loading} className={`${className}`} {...rest}>{children}</button>
        </div >
    );
};

export default ButtonComp;

// Creates a button
// If prop customClass is passed with value as follows:
// onHoverHighLight3: on Hover changes color to Highlight 3
// Prop href for href of anchor tag
// Prop children for text of button