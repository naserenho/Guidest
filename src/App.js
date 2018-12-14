import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Header, Search} from './Classes/Header';
import {Footer} from './Classes/Footer';
import {MainPage} from './Classes/MainPage';
import {SignInRegister} from './Classes/SignInRegister'
import {Listing} from './Classes/Listing'

import { Switch, Route, withRouter, Link, Redirect } from 'react-router-dom';


//import "react-responsive-carousel/lib/styles/carousel.min.css";
//import { Carousel } from 'react-responsive-carousel';

class App extends Component {
  state = {

    userInfo:{
      name: "",
      email: "",
      token: ""
    }
  }
  handleData = (obj) =>{
    this.setState({
        userInfo : {
          name: obj.name,
          email: obj.email
        }
    });
    localStorage["name"] = obj.name;
    localStorage["email"] = obj.email;
    localStorage["token"] = obj.token;
}

  render() {
    return (
      <div>
        <div id="preloader">
          <div className="dorne-load"></div>
        </div>
        <Header/>

        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/login" render={props => <SignInRegister handleData={this.handleData} />} />
          <Route path="/listing" render={props => <Listing />} />

        </Switch>
        <Footer/>
      </div>
    );
  }
}

export default App;
