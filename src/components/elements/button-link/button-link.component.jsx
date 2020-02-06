import React from 'react';

import './button-link.styles.css';

const ButtonLinkComp = (props) => {
    return (
        <div className='ButtonLink'>
            <a href={props.href} className={`${props.customClass}`}>{props.children}</a>
        </div >
    );
};

export default ButtonLinkComp;

// Creates a button
// If prop customClass is passed with value as follows:
// onHoverHighLight3: on Hover changes color to Highlight 3
// Prop href for href of anchor tag
// Prop children for text of button