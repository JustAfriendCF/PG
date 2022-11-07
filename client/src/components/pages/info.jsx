import React from 'react';
import odot from '../../images/odot.gif';
import './CSS_page/odot.css'
const info = () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'Right',
                alignItems: 'Right',
                height: '100vh',
                direction: 'rtl',
                marginRight: '24px',
                display: 'block'

            }}
        >
            <img className='odot' src={odot} />
        </div>
    );
};

export default info;