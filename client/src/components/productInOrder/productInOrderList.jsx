import React, { useEffect, useState, useContext } from 'react';
import productInOrderService from '../../services/productInOrderService';


export default function productInOrdersList(props) {

    const [productInOrders, setproductInOrders] = useState([]);
    const [newproductInOrder, setNewproductInOrder] = useState({ firstName: '', lastName: '' });

    useEffect(() => //initial
    {
        getproductInOrders();

        // eslint-disable-next-line
    }, []);

    const getproductInOrders = async () => {
        let _productInOrders = await productInOrderService.get();
        setproductInOrders(_productInOrders);
    }

    const updateFormState = (event) => {
        setNewproductInOrder({
            ...newproductInOrder,
            [event.target.name]: event.target.value,
        });
    };

    const add = async () => {
        let productInOrderId = await productInOrderService.post(newproductInOrder);
        getproductInOrders();
        setNewproductInOrder({ firstName: '', lastName: '' });
    }

    return (
        <div>
            <div>
                <h1>new productInOrder:</h1>
                first name:<input value={newproductInOrder.firstName} name='firstName' onChange={updateFormState}></input>
                last name:<input value={newproductInOrder.lastName} name='lastName' onChange={updateFormState}></input>
                <button onClick={add}>add productInOrder</button>

            </div>

            <div>
                productInOrders list: {
                    productInOrders.map(productInOrder => <>
                        <div>
                            {productInOrder.id} {productInOrder.firstName} {productInOrder.lastName}
                        </div>
                    </>)
                }
            </div>

        </div>
    )
}