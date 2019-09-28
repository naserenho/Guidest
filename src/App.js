import React, { Component } from 'react';
import './App.css';
import { Header, Search } from './Classes/Header';
import { Footer } from './Classes/Footer';
import { MainPage } from './Classes/MainPage';
import { Main } from './Classes/Main';
import { SignInRegister } from './Classes/SignInRegister';
import { Listing } from './Classes/Listing';
import { ItemDetailsForm } from './Classes/ManageItems';
import { CategoriesSubs } from './Classes/ManageCats';

import { Switch, Route, withRouter, Link, Redirect } from 'react-router-dom';


//import "react-responsive-carousel/lib/styles/carousel.min.css";
//import { Carousel } from 'react-responsive-carousel';

class App extends Component {
  state = {
    city: "All",

    userInfo: {
      name: "",
      email: "",
      token: "",
      role: ""
    }
  }
  handleLogin = (obj) => {
    this.setState({
      userInfo: {
        name: obj.loginname,
        email: obj.loginemail,
        token: obj.token,
        role: obj.userRole
      }
    });
    sessionStorage["name"] = obj.loginname;
    sessionStorage["email"] = obj.loginemail;
    sessionStorage["token"] = obj.token;
    sessionStorage["role"] = obj.userRole;
  }

  changeCity = (c) => {
    this.setState({ city: c });
  }

  loggedIn = () => {
    //console.log(this.state);
    if (sessionStorage["token"] != null && sessionStorage["token"] != undefined) {
      //console.log(localStorage["token"]);
      return true;
    }
    else {
      //console.log(localStorage["token"]);
      return false;
    }
  }
  Logout = () => {
    this.setState({

      userInfo: {
        name: "",
        email: "",
        token: "",
        role: ""
      }
    });

    sessionStorage["name"] = "";
    sessionStorage["email"] = "";
    sessionStorage["token"] = "";
    sessionStorage["role"] = "";
  }

  render() {
    return (
      <div>
        <div id="preloader">
          <div className="dorne-load"></div>
        </div>
        <Header loggedIn={this.loggedIn} logout={this.Logout} userInfo={this.state.userInfo}  />

        <Switch>
          <Route exact path="/" render={() => (
            <Main changeCity={this.changeCity} city={this.state.city} />
          )} />
          <Route path="/login" render={() => (
            !sessionStorage["token"] ? (
              <SignInRegister handleLogin={this.handleLogin} />
            ) : (
                <Redirect to="/" />
              )
          )} />
          <Route exact path="/Items/Manage" render={() => (
            sessionStorage["role"] && sessionStorage["role"] == "Admin" || sessionStorage["role"] == "SuperAdmin" ? (
              <ItemDetailsForm token={sessionStorage["token"]} />
            ) : (
                <Redirect to="/" />
              )
          )} />
          <Route exact path="/Cats/Manage" render={() => (
            sessionStorage["role"] && sessionStorage["role"] == "SuperAdmin" ? (
              <CategoriesSubs token={sessionStorage["token"]} />
            ) : (
                <Redirect to="/" />
              )
          )} />
          <Route exact path="/Users" render={() => (
            sessionStorage["role"] && sessionStorage["role"] == "Admin" || sessionStorage["role"] == "SuperAdmin" ? (
              <ItemDetailsForm />
            ) : (
                <Redirect to="/" />
              )
          )} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
