import { ADD_TO_CART, REMOVE_FROM_CART } from "../types";
/*
export const addToCart = (product) => (dispatch, getState) => {
  debugger

  let cartItems = getState().cart.cartItems.slice();
  try {
    let flag = cartItems.filter({ id: product.id })
    dispatch({
      type: INC_PRODUC_IN_CART,
      payload: { product },
    });
  }
  catch {
    dispatch({
      type: ADD_TO_CART,
      payload: { pro },
    });
  }

  
  if(flag)
  {
    dispatch({
      type: INC_PRODUC_IN_CART,
      payload: { product },
    }); 
  }
  else{
    dispatch({
      type: ADD_TO_CART,
      payload: { pro },
    });
  
  }
}*/
export const addToCart = (product) => (dispatch, getState) => {

  let cartItems = getState().cart.cartItems.slice();
  let alreadyExists = false;
  cartItems.forEach((x) => {

    if (x.product.id === product.id) {
      alreadyExists = true;
      x.count++;
    };
  });
  if (!alreadyExists) {

    cartItems.push({ product, count: 1 });
    // console.log(cartItems)
  }
  dispatch({
    type: ADD_TO_CART,
    payload: { cartItems },
  });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  console.log("items:", cartItems);
};

export const removeFromCart = (product) => (dispatch, getState) => {
  console.log('product', product)
  console.log("removeFromCart")
  console.log("/before:", getState().cart.cartItems)
  // for(const l in getState().cart.cartItems ) {
  //   if( l.id === product.id)
  // }


  const cartItems = getState().cart.cartItems.filter((x) => x.product.id != product.product.id);

  // const cartItems = getState().cart.cartItems.slice().filter((x) => x._id !== product._id);
  console.log(cartItems)
  dispatch({ type: REMOVE_FROM_CART, payload: { cartItems } });
  console.log("after:", getState().cart.cartItems)
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};
