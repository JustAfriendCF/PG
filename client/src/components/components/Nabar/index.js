import React, { useContext } from 'react';
import { NavLink as Link } from 'react-router-dom';

import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from './NavbarElements';
import '../../../index.css'
import UserContext from '../../../UserContext';
import { Button } from 'react-bootstrap';
const Navbar = (props) => {
    const { user, setUser } = useContext(UserContext);//get the curent user from the context

const activeStyleObj = {
    'textDecoration': 'underline'
}
    return (
        <>
            <Nav className={'navCss'}>
                <Bars />

                <NavMenu>
                    <NavLink key="1" to='/info' activeStyle={activeStyleObj}>
                        אודות
                    </NavLink>
                    <NavLink key="5" to='/home_page' activeStyle={activeStyleObj}>
                        דף הבית
                    </NavLink>
                    {/* <NavLink key="" to='/qAa' activeStyle={activeStyleObj}>
                        FAQ
                    </NavLink> */}
                    <NavLink key="2" to='/funArt' activeStyle={activeStyleObj}>
                        הציורים שלנו
                    </NavLink>
                    <NavLink key="3" to='/storeMD' activeStyle={activeStyleObj}>
                        חנות
                    </NavLink>
                    <NavLink key="4" to='/shoppingCart' activeStyle={activeStyleObj}>
                        עגלה
                    </NavLink>
                    {/* Second Nav */}
                    {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
                </NavMenu>
                <NavBtn>
                    <NavBtnLink className={'btn-login'} to='/signUp'> {!user.firstName ? 'כניסה' : `שלום ${user.firstName}`}</NavBtnLink>
                    {user.id > -1 && <NavBtnLink to='/signUp' className='bt' onClick={() => {
                        localStorage.removeItem("user");
                        setUser({ id: -1, firstName: 'Tom' }); props.f()
                    }}>יציאה</NavBtnLink>}

                </NavBtn>
            </Nav>
        </>
    );
};

export default Navbar;