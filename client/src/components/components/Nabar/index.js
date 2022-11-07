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


    return (
        <>
            <Nav className={'navCss'}>
                <Bars />

                <NavMenu>
                    <NavLink to='/info' activeStyle>
                        אודות
                    </NavLink>
                    {/* <NavLink to='/qAa' activeStyle>
                        FAQ
                    </NavLink> */}
                    <NavLink to='/funArt' activeStyle>
                        הציורים שלנו
                    </NavLink>
                    <NavLink to='/storeMD' activeStyle>
                        לחנות
                    </NavLink>
                    <NavLink to='/shoppingCart' activeStyle>
                        עגלה
                    </NavLink>
                    <NavLink to='/home_page' activeStyle>
                        דף הבית
                    </NavLink>
                    {/* Second Nav */}
                    {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
                </NavMenu>
                <NavBtn>
                    <NavBtnLink to='/signUp'> שלום {UserContext === 'null' ? 'כניסה' : user.firstName}</NavBtnLink>
                    <Button className='bt' onClick={() => {
                        localStorage.removeItem("user");
                        setUser({ id: -1, firstName: 'Tom' }); props.f()
                    }}>יציאה</Button>

                </NavBtn>
            </Nav>
        </>
    );
};

export default Navbar;