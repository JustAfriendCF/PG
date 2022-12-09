import React, { Component } from "react";
import { connect } from "react-redux";
import { filterProducts, sortProducts, filterProductsColor, filterProductsCategory } from "../actions/productActions";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // arr:[{id:'1',name:"ddd"}, {id:'1',name:"ddd"}, {id:'1',name:"ddd"}]
      product: null,
    };
  }
  render() {
    // return !this.state.arr ? (

    return !this.props.filteredProducts ? (
      <div>Loading...</div>
    ) : (
      <div className="filter">
        <div className="filter-result all-filters">
          {/* {this.state.arr.length} Products */}
          {this.props.filteredProducts.length} מוצרים
        </div>
        <div className="filter-sort all-filters">
          מיין על פי{" "}
          <select
            value={this.props.sort}
            onChange={(e) =>
              this.props.sortProducts(
                this.props.filteredProducts,
                e.target.value
              )
            }
          >
            <option value="latest">חדש</option>
            <option value="lowest">מחיר נמוך</option>
            <option value="highest">מחיר גבוה</option>
          </select>
        </div>
        <div className="filter-size all-filters">
          מידה{" "}
          <select
            value={this.props.size}
            onChange={(e) =>
              this.props.filterProducts(this.props.products, e.target.value)
            }
          >
            <option value="">כל המידות</option>
            <option value="12">12</option>
            <option value="14">14</option>
            <option value="16">16</option>
            <option value="18">18</option>
          </select>
        </div>
        <div className="filter-color all-filters">
          צבע{" "}
          <select
            value={this.props.color}
            onChange={(e) =>
              this.props.filterProductsColor(this.props.products, e.target.value)
            }
          >
            <option value="">כל הצבעים</option>
            <option value="black" style={{ color: 'black' }}>שחור</option>
            <option value="yellow" style={{ color: '#c6c60d' }}>צהוב</option>
            <option value="pink" style={{ color: 'pink' }}>ורוד</option>
            <option value="red" style={{ color: 'red' }}>אדום</option>
            <option value="blue" style={{ color: 'blue' }}>כחול</option>
            <option value="white" style={{ color: 'gray' }}>לבן</option>
          </select>
        </div>
        <div className="filter-category all-filters">
          קטגוריה{" "}
          <select
            value={this.props.category}
            onChange={(e) =>
              this.props.filterProductsCategory(this.props.products, e.target.value)
            }
          >
            <option value="">כל הקטגוריות</option>
            <option value="books">ספרים</option>
            <option value="clothes">בגדים</option>
            <option value="games">משחקים</option>
          </select>
        </div>
      </div>
    );
  }
}
export default connect(
  (state) => ({
    size: state.products.size,
    sort: state.products.sort,
    products: state.products.items,
    filteredProducts: state.products.filteredItems,
  }),
  {
    filterProducts,
    filterProductsColor,
    filterProductsCategory,
    sortProducts,
  }
)(Filter);