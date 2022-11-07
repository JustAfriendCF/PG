import React from 'react';
import { connect } from 'react-redux'
import { FaShoppingCart } from 'react-icons/fa';
import ReactDOM from 'react-dom';
import props from 'prop-types';
import Cart from '../../storeMD/components/Cart'
// import Cart from '../../storeMD/cart/Cart2'

const ShoppingCart = (props) => {
    return (
        <>
            <Cart/>
            {/* {props.carts?.map(cart => {
                return <div>
                    <h1>name: {cart.product.name_}</h1>
                    <div>count: {cart.count}</div>
                </div>
            })} */}
        </>
    )
};

export default ShoppingCart;

