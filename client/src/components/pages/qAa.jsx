import React from 'react';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from '../components/Nabar/NavbarElements';
import './CSS_page/qAa.css'
const qAa = () => {
    return (
        <div >
            <Nav className="qAaButton">
                <NavBtn className="qAaButton">
                     <NavBtnLink to='/artist'>מנהל מערכת</NavBtnLink> 
                </NavBtn>
                <NavBtn className="qAaButton">
                    <NavBtnLink to='/checker'>בודק</NavBtnLink>
                </NavBtn>
            </Nav>
        </div>
    );
};

export default qAa;