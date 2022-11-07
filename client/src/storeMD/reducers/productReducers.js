import {
  FETCH_PRODUCTS,
  FILTER_PRODUCTS_BY_SIZE,
  ORDER_PRODUCTS_BY_PRICE,
  FILTER_PRODUCTS_BY_COLOR,
  FILTER_PRODUCTS_BY_CATEGORY,

} from "../types";

export const productsReducer = (state = {}, action) => {
  switch (action.type) {
    case FILTER_PRODUCTS_BY_SIZE:
      debugger
      return {
        ...state,
        size: action.payload.size,
        filteredItems: action.payload.items,
      };
    case FILTER_PRODUCTS_BY_COLOR:
      debugger
      return {
        ...state,
        color: action.payload.color,
        filteredItems: action.payload.items,
      };
    case FILTER_PRODUCTS_BY_CATEGORY:
      debugger
      return {
        ...state,
        category: action.payload.category,
        filteredItems: action.payload.items,
      };
    case ORDER_PRODUCTS_BY_PRICE:
      return {
        ...state,
        sort: action.payload.sort,
        filteredItems: action.payload.items,
      };
    case FETCH_PRODUCTS:
      return { items: action.payload, filteredItems: action.payload };
    default:
      return state;
  }
};