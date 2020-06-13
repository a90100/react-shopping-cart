import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import Header from "../components/layout/Header";
import SignInLinks from "../components/layout/SignInLinks";
import SignOutLinks from "../components/layout/SignOutLinks";
import Dashboard from "../components/main/Dashboard";
import Cart from "../components/main/Cart";
import User from "../components/main/User";
import Login from "../components/main/Login";
import Logout from "../components/main/Logout";
import Register from "../components/main/Register";
import { connect } from "react-redux";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    font-family: 'Noto Sans TC', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const App = (props) => {
  const links = props.auth.uid ? <SignInLinks /> : <SignOutLinks />;

  return (
    <BrowserRouter>
      <GlobalStyle />
        <Header>
          <Link to="/" className="header-title">
            瞎品購物
          </Link>
          {links}
        </Header>
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/myCart" exact component={Cart} />
          <Route path="/user" exact component={User} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
        </Switch>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(App);
