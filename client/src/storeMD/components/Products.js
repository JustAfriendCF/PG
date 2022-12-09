import React, { Component } from "react";
import formatCurrency from "../util";
import { Fade } from 'react-reveal';
//import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import { connect } from "react-redux";
import { fetchProducts } from "../actions/productActions";
import { addToCart } from "../actions/cartActions";
import './style.css'
import add1 from '../../images/home_page_adds/add1.jpg'
import { MdAddShoppingCart } from 'react-icons/md';


class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      showModal: false
    };
  }
  componentDidMount() {
    this.props.fetchProducts();
  }
  openModal = (product) => {
    console.log('my product:', product);
    this.setState({...this.state,  product });
  };
  closeModal = () => {
    this.setState({...this.state,  product: null });
  };
  getUrl = (productImage) => {
    return `http://localhost:8080/product/getPicture?fileName=${productImage}`
  }

  checkSize=(size)=>{
    // כאן נשמר המידה שנבחרה ע"י המשתמש 
    console.log(size);
  }
  render() {

    const { product } = this.state;
    return (
      <div>
        <Fade bottom cascade>
          {!this.props.products ? (
            <div>Loading...</div>
          ) : (
            <ul className="products">
              {this.props.products.map((product) => (
                // {[{ id: '1', name_: 'aaa', image: add1, price: 12 },
                // { id: '2', name_: 'aaa', image: add1, price: 12 },
                // { id: '3', name_: 'aaa', image: add1, price: 12 },
                // { id: '4', name_: 'aaa', image: add1, price: 12 }].map((product) => (
                <li key={product.id} className="product-item">
                  <a
                    href={"#" + product.id}
                    onClick={() => this.openModal(product)}
                  >
                    <img src={this.getUrl(product.image)} alt={product.name_} className='img-product'></img>
                    {/* <img src={product.image} alt={product.name_} className='img-product'></img> */}
                    <p>{product.name_}</p>
                  </a>
                  <div className="product-price">
                    <div className="productPrice">{formatCurrency(product.price)}</div>
                    <button
                      onClick={() => {this.props.addToCart(product); this.setState({...this.state, showModal: true})}}
                      className="btn-add-to-cart"
                    >
                      <MdAddShoppingCart />

                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Fade>
        <Modal
                closeTimeoutMS={200}
                 style={{
                    content: {
                        width: "max-content",
                        height: "max-content"
                    }
                }} shouldCloseOnOverlayClick={true}
                onRequestClose={() => this.setState({...this.state, showModal: false})}
                    isOpen={this.state.showModal === true}
                    contentLabel="modal"
                >
                    <h2>המוצר נוסף בהצלחה</h2>
                    <hr></hr>
                    <button className="button-remove-from-cart" onClick={() => this.setState({...this.state, showModal: false})}>אישור</button>
                </Modal>
        {product && (
          <Modal isOpen={true} onRequestClose={this.closeModal}>
            <Zoom>
              <button className="close-modal" onClick={this.closeModal}>
                x
              </button>
              <div className="product-details">
                <img src={this.getUrl(product.image)} alt={product.name_}></img>
                <div className="product-details-description_">
                  <p>
                    <strong>{product.name_}</strong>
                  </p>
                  <p>{product.description_}</p>
                  <p>
                    מידה:{" "}
                    {product.availableSizes.map((x) => (
                      <span>
                        {" "}
                        <button className="btn-size" onClick={()=>this.checkSize(x)}>{x}</button>
                      </span>
                    ))}
                  </p>
                  <div className="product-price">
                    <div>{formatCurrency(product.price)}</div>
                    {/* <div>{formatCurrency(product.price)}</div> */}
                    <button
                      className="button primary"
                      onClick={() => {
                        this.props.addToCart(product);
                        this.closeModal();
                      }}
                    >
                      הוספה לעגלה
                    </button>
                  </div>
                </div>
              </div>
            </Zoom>
          </Modal>
        )}
      </div>
    );
  }
}
export default connect(
  (state) => ({ products: state.products.filteredItems }),
  {
    fetchProducts,
    addToCart,
  }
)(Products);
