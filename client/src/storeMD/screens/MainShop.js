import React, { Component } from "react";
import Filter from "../components/Filter";
import Products from "../components/Products";
import Add from "../components/Add";

export default class MainShop extends Component {
  render() {
    return (
      <div>
        <div className="content">
          <div className="main">
            <Filter></Filter>
            <Products></Products>
          </div>
          <div className="sidebar">
            <Add />
          </div>
        </div>
      </div>
    );
  }
}
