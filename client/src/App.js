import React, { useState, useMemo } from 'react';
import logo from './logo.svg';
import './App.css';
import { render } from "react-dom";
import UsersList from './components/users/UsersList'
import ProductsList from './components/products/ProductsList'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import home_page from './components/pages/home_page';
// import { Container, Button, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import funArt from './components/pages/funArt';
import info from './components/pages/info';
import qAa from './components/pages/qAa';
import signUp from './components/pages/signUp';
import storeMD from './components/pages/storeMD';
import shoppingCart from './components/pages/shoppingCart';
import Navbar from './components/components/Nabar';
import { Provider } from 'react-redux';
import store from './storeMD/store'
import UserContext from './UserContext';
import ArtistComponent from './components/pages/sub_pages/artist'
import CheckerComponent from './components/pages/sub_pages/checker'

// const msg = useContext(UserContext);

const App = () => {
  console.log('localStorage.user', localStorage.user);
  // const [user, setUser] = useState(localStorage.user != null ? JSON.parse(localStorage.user) : { id: user.id, firstName: user.firstName });
  const [user, setUser] = useState('esther');
  const f = () => {
    setUser({});

  }
  // const [cart, setCart] = useState({});
  // const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  // const value = useMemo(() => ({ user, setUser },{cart, setCart}), [user, setUser,cart, setCart]);
  const value = useMemo(
    () => ({ user, setUser }),
    [user]
  );
  return (
    <>
      <Provider store={store}>
        <Router>

          <UserContext.Provider value={value}>
            <Navbar f={f} />
            <Switch>
              <Route path='/home_page' exact component={home_page} />
              <Route path='/info' component={info} />
              <Route path='/qAa' component={qAa} />
              <Route path='/funArt' component={funArt} />
              <Route path='/storeMD' component={storeMD} />
              <Route path='/shoppingCart' component={shoppingCart} />
              <Route path='/SignUp' component={signUp} />
              <Route path='/artist' component={ArtistComponent} />
              <Route path='/checker' component={CheckerComponent} />
            </Switch>
          </UserContext.Provider>
        </Router>
      </Provider>
    </>
  );
}

export default App;

/*
shop project:<br />
<nav
  style={{
    borderBottom: "solid 1px",
    paddingBottom: "1rem"
  }}>
  <BrowserRouter>
    <Link to='/usersList'>users</Link>
    <Link to='/productsList'>prducts</Link>
    <Switch>
      <Route path='/usersList' component={UsersList} />
      <Route path='/productsList' component={ProductsList} />
    </Switch>
  </BrowserRouter>
</nav>
*/
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>