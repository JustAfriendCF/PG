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

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      address: "",
      showCheckout: false,
    };
    console.log(this.props);
  }
  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  createOrder = async (e) => {
    e.preventDefault();
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.cartItems,
      total: this.props.cartItems.reduce((a, c) => a + c.product.price * c.count, 0),
    };
    console.log(order);
    let result = await axios.post('http://localhost:8080/order_/addOrder', { order, idUser: 1 });

    alert('הזמנתך נשמרה ותשלח אליך בימים הקרובים');
    this.props.createOrder(order);
    localStorage.removeItem("cartItems");
  };


  closeModal = () => {
    this.props.clearOrder();
  };
  render() {
    const { cartItems, order } = this.props;
    return (
      <div>
        {cartItems.length === 0 ? (
          <div className="cart cart-header">Cart is empty</div>
        ) : (
          <div className="cart cart-header">
            יש לך {cartItems.length} מוצרים בעגלה{" "}
          </div>
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
                    <li key={item._id}>
                      <div>
                        <img src={productService.getUrl(item.product.image)} alt={item.product.name_} />
                      </div>
                      <div>
                        <div>{item.product.name_}</div>
                        {/* <div>{productService.getUrl(item.product.image)}</div> */}

                        <div className="right">
                          {formatCurrency(item.product.price)} x {item.product.count}{" "}
                          <button
                            className="button"
                            onClick={() => this.props.removeFromCart(item)}
                          >
                            הסרה
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </Fade>
            </div>
            {cartItems.length !== 0 && (
              <div>
                <div className="cart">
                  <div className="total">
                    <div>
                      סה"כ לתשלום:{" "}
                      {formatCurrency(
                        cartItems.reduce((a, c) => a + c.product.price * c.count, 0)
                      )}
                    </div>
                    <button
                      onClick={() => {
                        this.setState({ showCheckout: true });
                      }}
                      className="button primary"
                    >
                      לסיום קניה
                    </button>
                  </div>
                </div>
                {this.state.showCheckout && (
                  <Fade right cascade>
                    <div className="cart">
                      <form onSubmit={this.createOrder}>
                        <ul className="form-container">
                          <li>
                            <label>אימייל</label>
                            <input
                              name="email"
                              type="email"
                              required
                              onChange={this.handleInput}
                            ></input>
                          </li>
                          <li>
                            <label>שם</label>
                            <input
                              name="name"
                              type="text"
                              required
                              onChange={this.handleInput}
                            ></input>
                          </li>
                          <li>
                            <label>כתובת</label>
                            <input
                              name="address"
                              type="text"
                              required
                              onChange={this.handleInput}
                            ></input>
                          </li>
                          <li>
                            <button className="button primary" type="submit">
                              לתשלום
                            </button>
                          </li>
                        </ul>
                      </form>
                    </div>
                  </Fade>
                )}
              </div>
            )}
          </div>
        )}
      </div>
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
