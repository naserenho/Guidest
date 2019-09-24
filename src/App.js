import React, { Component } from 'react';
import './App.css';
import { Header, Search } from './Classes/Header';
import { Footer } from './Classes/Footer';
import { MainPage } from './Classes/MainPage';
import { Main } from './Classes/Main';
import { SignInRegister } from './Classes/SignInRegister';
import { Listing } from './Classes/Listing';
import { ItemDetailsForm } from './Classes/ManageItems';

import { Switch, Route, withRouter, Link, Redirect } from 'react-router-dom';


//import "react-responsive-carousel/lib/styles/carousel.min.css";
//import { Carousel } from 'react-responsive-carousel';

class App extends Component {
  state = {

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
    localStorage["name"] = obj.loginname;
    localStorage["email"] = obj.loginemail;
    localStorage["token"] = obj.token;
  }

  loggedIn = () => {
    //console.log(this.state);
    if (localStorage["token"] != null && localStorage["token"] != undefined) {
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
    localStorage["name"] = "";
    localStorage["email"] = "";
    localStorage["token"] = "";
  }

  render() {
    return (
      <div>
        <div id="preloader">
          <div className="dorne-load"></div>
        </div>
        <Header loggedIn={this.loggedIn} logout={this.Logout} userInfo={this.state.userInfo} />

        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/oldmain" component={MainPage} />
          <Route path="/login" render={() => (
            !this.state.userInfo.token ? (
              <SignInRegister handleLogin={this.handleLogin} />
            ) : (
                <Redirect to="/" />
              )
          )} />
          <Route path="/listing/:category" component={Listing} />
          <Route exact path="/Items/Manage" render={() => (
            this.state.userInfo && this.state.userInfo.role == "Admin" || this.state.userInfo.role == "SuperAdmin" ? (
              <ItemDetailsForm token={this.state.userInfo.token} /> 
            ) : (
              <Redirect to="/" />
            )
          )} />
          <Route exact path="/Users" render={() => (
            this.state.userInfo && this.state.userInfo.role == "Admin" || this.state.userInfo.role == "SuperAdmin" ? (
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
