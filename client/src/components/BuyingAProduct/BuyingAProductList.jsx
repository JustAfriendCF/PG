import React, { useEffect, useState, useContext } from 'react';
import BuyingAProductService from '../../services/BuyingAProductService';


export default function BuyingAProductsList(props) {

    const [BuyingAProducts, setBuyingAProducts] = useState([]);
    const [newBuyingAProduct, setNewBuyingAProduct] = useState({ firstName: '', lastName: '' });

    useEffect(() => //initial
    {
        getBuyingAProducts();

        // eslint-disable-next-line
    }, []);

    const getBuyingAProducts = async () => {
        let _BuyingAProducts = await BuyingAProductService.get();
        setBuyingAProducts(_BuyingAProducts);
    }

    const updateFormState = (event) => {
        setNewBuyingAProduct({
            ...newBuyingAProduct,
            [event.target.name]: event.target.value,
        });
    };

    const add = async () => {
        let BuyingAProductId = await BuyingAProductService.post(newBuyingAProduct);
        getBuyingAProducts();
        setNewBuyingAProduct({ firstName: '', lastName: '' });
    }

    return (
        <div>
            <div>
                <h1>new BuyingAProduct:</h1>
                first name:<input value={newBuyingAProduct.firstName} name='firstName' onChange={updateFormState}></input>
                last name:<input value={newBuyingAProduct.lastName} name='lastName' onChange={updateFormState}></input>
                <button onClick={add}>add BuyingAProduct</button>

            </div>

            <div>
                BuyingAProducts list: {
                    BuyingAProducts.map(BuyingAProduct => <>
                        <div>
                            {BuyingAProduct.id} {BuyingAProduct.firstName} {BuyingAProduct.lastName}
                        </div>
                    </>)
                }
            </div>

        </div>
    )
}