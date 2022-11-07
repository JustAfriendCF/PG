import { FETCH_PRODUCTS } from "../types";
import { FILTER_PRODUCTS_BY_SIZE, ORDER_PRODUCTS_BY_PRICE, FILTER_PRODUCTS_BY_COLOR, FILTER_PRODUCTS_BY_CATEGORY } from "../types";

export const fetchProducts = () => async (dispatch) => {
  const res = await fetch("http://localhost:8080/product/get");
  const data = await res.json();
  console.log(data);
  dispatch({
    type: FETCH_PRODUCTS,
    payload: data,
  });
};

export const filterProducts = (products, size) => (dispatch) => {
  debugger
  dispatch({
    type: FILTER_PRODUCTS_BY_SIZE,
    payload: {
      size: size,
      items:
        size === ""
          ? products
          : products.filter((x) => x.availableSizes.indexOf(size) >= 0),
    },
  });
};
export const filterProductsColor = (products, colorx) => (dispatch) => {
  debugger
  let obj = {
    type: FILTER_PRODUCTS_BY_COLOR,
    payload: {
      color: colorx,
      items:
        colorx === ""
          ? products
          // : products.filter((x) => x.color === colorx),
          // : products.filter((x) => x.color.in (colorx) >= 0),
          : products.filter((x) => x.color.indexOf(colorx) >= 0),
      // : products.filter((x) => x.color. ),
    },
  };
  dispatch(obj);
};
export const filterProductsCategory = (products, category) => (dispatch) => {
  debugger
  dispatch({
    type: FILTER_PRODUCTS_BY_CATEGORY,
    payload: {
      category: category,
      items:
        category === ""
          ? products
          // : products.filter((x) => x.category.indexOf(category) >= 0),
          : products.filter((x) => x.category == category),
    },
  });
};
export const sortProducts = (filteredProducts, sort) => (dispatch) => {
  const sortedProducts = filteredProducts.slice();
  if (sort === "latest") {
    sortedProducts.sort((a, b) => (a.id > b.id ? 1 : -1));
  } else {
    sortedProducts.sort((a, b) =>
      sort === "lowest"
        ? a.price > b.price
          ? 1
          : -1
        : a.price > b.price
          ? -1
          : 1
    );
  }
  console.log(sortedProducts);
  dispatch({
    type: ORDER_PRODUCTS_BY_PRICE,
    payload: {
      sort: sort,
      items: sortedProducts,
    },
  });
};
