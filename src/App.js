import React, { Component } from 'react';
import './App.css';
<<<<<<< HEAD
import { Header, Search } from './Classes/Header';
import { Footer } from './Classes/Footer';
import { MainPage } from './Classes/MainPage';
import { SignInRegister } from './Classes/SignInRegister'
import { Listing } from './Classes/Listing'
||||||| merged common ancestors
import {Header, Search} from './Classes/Header';
import {Footer} from './Classes/Footer';
import {MainPage} from './Classes/MainPage';
import {SignInRegister} from './Classes/SignInRegister'
import {Listing} from './Classes/Listing'
=======
import { Header, Search } from './Classes/Header';
import { Footer } from './Classes/Footer';
import { MainPage } from './Classes/MainPage';
import { Main } from './Classes/Main';
import { SignInRegister } from './Classes/SignInRegister'
import { Listing } from './Classes/Listing'
>>>>>>> c811ec94ebc7f1e09731df45ced65f14b6b685cc

import { Switch, Route, withRouter, Link, Redirect } from 'react-router-dom';


//import "react-responsive-carousel/lib/styles/carousel.min.css";
//import { Carousel } from 'react-responsive-carousel';

class App extends Component {
  state = {

    userInfo: {
      name: "",
      email: "",
      token: ""
    }
  }
  handleData = (obj) => {
    this.setState({
      userInfo: {
        name: obj.loginname,
        email: obj.loginemail,
        token: obj.token
      }
    });
    localStorage["name"] = obj.loginname;
    localStorage["email"] = obj.loginemail;
    localStorage["token"] = obj.token;
  }

  loggedIn = () => {
    console.log(this.state);
    if (localStorage["token"] != null && localStorage["token"] != undefined) {
      console.log(localStorage["token"]);
      return true;
    }
    else {
      console.log(localStorage["token"]);
      return false;
    }
  }
  Logout = () => {
    this.setState({
      userInfo: {
        name: "",
        email: "",
        token: ""
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
        <Header loggedIn={this.loggedIn} logout={this.Logout} />

        <Switch>
<<<<<<< HEAD
          <Route exact path="/" component={MainPage} />
          <Route path="/login" render={() => (
            localStorage["token"] == "" || localStorage["token"] == null ? (
              <SignInRegister handleData={this.handleData} />
            ) : (
                <Redirect to="/" />
              )
          )} />
||||||| merged common ancestors
          <Route exact path="/" component={MainPage} />
         <Route  path="/login" render={() => (
 localStorage["token"] == "" || localStorage["token"] == null ? (
   <SignInRegister handleData={this.handleData} />
   ) : (
    <Redirect to="/"/>
 )
)}/>
=======
          <Route exact path="/" component={Main} />
          <Route path="/oldmain" component={MainPage} />
          <Route path="/login" render={() => (
            localStorage["token"] == "" || localStorage["token"] == null ? (
              <SignInRegister handleData={this.handleData} />
            ) : (
                <Redirect to="/" />
              )
          )} />
>>>>>>> c811ec94ebc7f1e09731df45ced65f14b6b685cc
          <Route path="/listing/:category" component={Listing} />

        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
