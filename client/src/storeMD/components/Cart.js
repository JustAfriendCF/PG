import React, { Component } from "react";
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";
import { connect } from "react-redux";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import { removeFromCart } from "../actions/cartActions";
import { createOrder, clearOrder } from "../actions/orderActions";
import productService from "../../services/productService";
import axios from "axios";
import { FaRegCheckCircle } from 'react-icons/fa';
import { MdOutlinePayment } from 'react-icons/md';
import './style.css';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      address: "",
      showCheckout: false,
      isSuccessToPay: false
    };
    console.log(this.props);
  }
  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  createOrder = async (e) => {
    // e.preventDefault();
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.cartItems,
      total: this.props.cartItems.reduce((a, c) => a + c.product.price * c.count, 0),
    };
    console.log(order);
    let result = await axios.post('http://localhost:8080/order_/addOrder', { order, idUser: 1 });

    // alert('הזמנתך נשמרה ותשלח אליך בימים הקרובים');
    this.props.createOrder(order);
    localStorage.removeItem("cartItems");
  };


  closeModal = () => {
    this.props.clearOrder();
  };
  render() {
    const { cartItems, order } = this.props;
    return (
      <>
        {!this.state.isSuccessToPay ? <div>
          {cartItems.length === 0 ? (
            <h2 className="cart cart-header">העגלה שלך ריקה</h2>
          ) : (
            <h2 className="cart cart-header">
              יש לך {cartItems.length} מוצרים בעגלה{" "}
            </h2>
          )}
          {/* {console.console.log((order))} */}
          {order && console.log(order) && (
            <Modal isOpen={true} onRequestClose={this.closeModal}>
              <Zoom>
                <button className="close-modal" onClick={this.closeModal}>
                  x
                </button>
                <div className="order-details">
                  <h3 className="success-message">Your order has been placed.</h3>
                  <h2>Order {order._id}</h2>
                  <ul>
                    <li>
                      <div>שם:</div>
                      <div>{order.name}</div>
                    </li>
                    <li>
                      <div>אימייל:</div>
                      <div>{order.email}</div>
                    </li>
                    <li>
                      <div>כתובת:</div>
                      <div>{order.address}</div>
                    </li>
                    <li>
                      <div>תאריך:</div>
                      <div>{order.createdAt}</div>
                    </li>
                    <li>
                      <div>סה"כ:</div>
                      <div>{formatCurrency(order.total)}</div>
                    </li>
                    <li>
                      <div>מוצרים בעגלה:</div>
                      <div>
                        {order.cartItems?.map((x) => (
                          <div>
                            {x.count} {" x "} {x.name_}
                          </div>
                        ))}
                      </div>
                    </li>
                  </ul>
                </div>
              </Zoom>
            </Modal>
          )}
          {order && (
            <div>
              <div className="cart">
                <Fade left cascade>
                  <ul className="cart-items">
                    {/* {cartItems.length !== 0 && cartItems.map((item) => ( */}
                    {cartItems.map((item) => (
                      <li className="product-price-cart li-product" key={item._id}>
                        <img className="img-cart" src={productService.getUrl(item.product.image)} alt={item.product.name_} />
                        {/* <div> */}
                        <div>{item.product.name_}</div>
                        {/* <div>{productService.getUrl(item.product.image)}</div> */}
                        <div className="count-prod">
                          {/* <button className="btn-size">XL</button> */}
                          <div className="count-prod b">
                            <span> {item.count}</span>
                            <span>x</span>
                            <span>{formatCurrency(item.product.price)}</span>
                          </div>
                          <button
                            className="button-remove-from-cart price-box"
                            onClick={() => this.props.removeFromCart(item)}
                          >
                            הסרה
                          </button>
                        </div>
                        {/* </div> */}
                      </li>
                    ))}
                  </ul>
                </Fade>
              </div>
              {cartItems.length !== 0 && (
                <div>
                  <div className="cart style-static">
                    <div className="total total-line">
                      {/* <div> */}
                      סה"כ לתשלום:{" "}
                      {formatCurrency(
                        cartItems.reduce((a, c) => a + c.product.price * c.count, 0)
                      )}
                      {/* </div> */}
                      <button
                        onClick={() => {
                          this.setState({ showCheckout: true });
                        }}
                        className="button primary btn-finish-buy"
                      >
                        לסיום קניה
                      </button>
                    </div>
                  </div>
                  {this.state.showCheckout && <Modal
                    style={{
                      content: {
                        // width: "max-content",
                        height: "max-content"
                      }
                    }}
                    // onRequestClose={() => setShowModal(false)}
                    isOpen={this.state.showCheckout  === true}
                    contentLabel="modal"
                  >
 <Fade right cascade>
                        <div className="cart cart-finish">
                          <form onSubmit={this.createOrder}>
                          <h2>הכנס פרטי תשלום:</h2>
                            <ul className="form-container">
                              <li>
                                <label className="lable-pay">אימייל</label>
                                <input
                                  className="input-to-pay"
                                  name="email"
                                  type="email"
                                  required
                                  onChange={this.handleInput}
                                ></input>
                              </li>
                              <li>
                                <label className="lable-pay">שם</label>
                                <input
                                  className="input-to-pay"
                                  name="name"
                                  type="text"
                                  required
                                  onChange={this.handleInput}
                                ></input>
                              </li>
                              <li>
                                <label className="lable-pay">כתובת</label>
                                <input
                                  className="input-to-pay"
                                  name="address"
                                  type="text"
                                  required
                                  onChange={this.handleInput}
                                ></input>
                              </li>
                              <li>
                                <button className="button primary" type="submit" onClick={() => { this.setState({ isSuccessToPay: true }); this.createOrder() }}>
                                  לתשלום
                                </button>
                              </li>
                            </ul>
                          </form>
                        </div>
                      </Fade>                  

                  
                  </Modal> }
                </div>
              )}
            </div>
          )}
        </div>
          : <div className="success-payment">
            <p className="title-success-payment">
              הזמנתך הושלמה בהצלחה !
            </p> <br />
            פרטי ההזמנה:
            {cartItems?.map((item) =>
              <div className="current-item-order">

                <p>{item.product.name_}</p>
                <p className="title-success-payment"><FaRegCheckCircle /></p>
              </div>
            )}
            <div className="total-payment">
              <MdOutlinePayment />
              סה"כ
              {formatCurrency(
                cartItems.reduce((a, c) => a + c.product.price * c.count, 0)
              )}</div>
          </div>}
      </>
    );
  }
}

export default connect(
  (state) => {
    //debugger
    return {
      order: state.order.order,
      cartItems: state.cart?.cartItems,
      // cartItems: state.cart.cartItems,
    }
  },
  { removeFromCart, createOrder, clearOrder }
)(Cart);
