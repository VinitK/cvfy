import React from 'react';

import './button.styles.css';

const ButtonComp = ({ type, customClass, loading, children, ...restProps }) => {
    return (
        <div className='Button'>
            <button type={type} className={`${customClass}`} disabled={loading}>{children}</button>
        </div >
    );
};

export default ButtonComp;

// Creates a button
// If prop customClass is passed with value as follows:
// onHoverHighLight3: on Hover changes color to Highlight 3
// Prop href for href of anchor tag
// Prop children for text of button