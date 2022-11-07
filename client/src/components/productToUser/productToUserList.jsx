import React, { useEffect, useState, useContext } from 'react';
import productToUserService from '../../services/productToUserService';


export default function productToUsersList(props) {

    const [productToUsers, setproductToUsers] = useState([]);
    const [newproductToUser, setNewproductToUser] = useState({ firstName: '', lastName: '' });

    useEffect(() => //initial
    {
        getproductToUsers();

        // eslint-disable-next-line
    }, []);

    const getproductToUsers = async () => {
        let _productToUsers = await productToUserService.get();
        setproductToUsers(_productToUsers);
    }

    const updateFormState = (event) => {
        setNewproductToUser({
            ...newproductToUser,
            [event.target.name]: event.target.value,
        });
    };

    const add = async () => {
        let productToUserId = await productToUserService.post(newproductToUser);
        getproductToUsers();
        setNewproductToUser({ firstName: '', lastName: '' });
    }

    return (
        <div>
            <div>
                <h1>new productToUser:</h1>
                first name:<input value={newproductToUser.firstName} name='firstName' onChange={updateFormState}></input>
                last name:<input value={newproductToUser.lastName} name='lastName' onChange={updateFormState}></input>
                <button onClick={add}>add productToUser</button>

            </div>

            <div>
                productToUsers list: {
                    productToUsers.map(productToUser => <>
                        <div>
                            {productToUser.id} {productToUser.firstName} {productToUser.lastName}
                        </div>
                    </>)
                }
            </div>

        </div>
    )
}