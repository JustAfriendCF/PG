import React, { Component, useContext } from "react";
import formatCurrency from "../util";
import { Fade } from 'react-reveal';
//import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import { connect } from "react-redux";
import { fetchProducts } from "../actions/productActions";
import { addToCart } from "../actions/cartActions";
import UserContext from '../../UserContext';
import axios from "axios";
// const { user, setUser } = useContext(UserContext);
class Add extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product: null,
        };
    }
    getAdd = () => {


    }
    async componentDidMount() {
        try {
            console.log("here")
            //UserContext.id
            const response = await axios.get("http://localhost:8080/product/getAdd", { userId: 1 })
            console.log("response", response.data);
            let _maxproduct = response.data;
            this.setState({ product: _maxproduct });

        }
        catch (e) {
            console.log("error", e)
        }
    }
    openModal = (product) => {
        this.setState({ product });
    };
    closeModal = () => {
        this.setState({ product: null });
    };

    getUrl = (productImage) => {
        return `http://localhost:8080/product/getPicture?fileName=${productImage}`
    }



    render() {
        const { product } = this.state;
        return (
            <>
                <div>
                    <h1>  !רק בשבילך</h1>
                    {product && <li key={product.id}>
                        <div className="product">
                            <a
                                href={"#" + product.id}
                                onClick={() => this.openModal(product)}
                            >
                                <img src={this.getUrl(product.image)} alt={product.name_}></img>
                                <p>{product.name_}</p>
                            </a>
                            <div className="product-price">
                                <div>{formatCurrency(product.price)}</div>
                                <button
                                    onClick={() => this.props.addToCart(product)}
                                    className="button primary"
                                >
                                    הוספה לעגלה
                                </button>
                            </div>
                        </div>
                    </li>
                    }
                </div>

            </>
            // <div>
            //     <Fade bottom cascade>
            //         {!this.props.products ? (
            //             <div>Loading...</div>
            //         ) : (
            //             <ul className="products">
            //                 {this.props.products.closestProduct()}
            //             </ul>
            //         )}
            //     </Fade>
            //     {product && (
            //         <Modal isOpen={true} onRequestClose={this.closeModal}>
            //             <Zoom>
            //                 <button className="close-modal" onClick={this.closeModal}>
            //                     x
            //                 </button>
            //                 <div className="product-details">
            //                     <img src={product.image} alt={product.name_}></img>
            //                     <div className="product-details-description_">
            //                         <p className="nameCss">
            //                             <strong>{product.name_}</strong>
            //                         </p>
            //                         <p>{product.description_}</p>
            //                         <p>
            //                             Avaiable Sizes:{" "}
            //                             {product.availableSizes.map((x) => (
            //                                 <span>
            //                                     {" "}
            //                                     <button className="button">{x}</button>
            //                                 </span>
            //                             ))}
            //                         </p>
            //                         <div className="product-price">
            //                             <div>{formatCurrency(product.price)}</div>
            //                             <button
            //                                 className="button primary"
            //                                 onClick={() => {
            //                                     this.props.addToCart(product);
            //                                     this.closeModal();
            //                                 }}
            //                             >
            //                                 Add To Cart
            //                             </button>
            //                         </div>
            //                     </div>
            //                 </div>
            //             </Zoom>
            //         </Modal>
            //     )}
            // </div>
        );
    }
}
export default Add;