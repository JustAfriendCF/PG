import React from "react";
import store from "../../storeMD/store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Link } from "react-router-dom";
import MainShop from "../../storeMD/screens/MainShop";
import AdminScreen from '../../storeMD/screens/AdminScreen'
import '../../storeMD/index.css'

const storeMD = () => {
    return (
        <Provider store={store}>
            {/* <BrowserRouter> */}
            <div className="grid-container">
                <header>
                    חנות
                    {/* <Link to="/storeMD/">React Shopping Cart</Link>
                    <Link to="/storeMD/admin">Admin</Link> */}
                </header>
                <main>
                    <Route path="/storeMD/admin" component={AdminScreen} />
                    <Route path="/storeMD/" component={MainShop} exact />
                </main>
                <footer></footer>
            </div>
            {/* </BrowserRouter> */}
        </Provider>
    );
};

export default storeMD;