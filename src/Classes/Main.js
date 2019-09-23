import React, { Component } from 'react';
import { Featured, SingleFeature } from './Featured';
import { Categories } from './Categories';
import { Subcategories } from './Subcategories';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Clients } from './Clients';

import "react-tabs/style/react-tabs.css";

export class Main extends Component {
    state = {
        category: "",
        subcategory: "",
        subcats: [],
        city: ""
    }

    changeCity = (e) => {
        this.setState({ city: e.target.value });
    }

    handleCategory = (e) => {
        this.setState({ category: e });
        this.fillSubs(e);
    }

    handleSubcategory = (e) => {
        this.setState({ subcategory: e.target.value });
    }

    fillSubs = (e) => {
        fetch('https://guidestae.herokuapp.com/subcats/get/' + e, {
            method: 'get',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then((res) => {
            res.json().then(r => {
                this.setState({
                    subcats: r.Subcategories
                });
            }).catch(err => {
                this.setState({
                    // loginstatus: false,
                    // showResultLogin: true
                });
            });
        });
    }

    render() {
        return <div>
            <section className="dorne-welcome-area">
                <div className="container h-100">
                    <div className="row h-100 align-items-center justify-content-center">
                        <div className="col-12 col-md-10">


                            <div id="welcome-section" className="hero-content">
                                <h4 className="p-4">Your best guide wherever you are! </h4>
                            </div>
                            <div>
                                <select value={this.state.city} onChange={this.changeCity} className="custom-select">
                                    <option value="0">Your Destinations</option>
                                    <option value="AbuDhabi">Abu Dhabi</option>
                                    <option value="AlAin">Al Ain</option>
                                    <option value="Dubai">Dubai</option>
                                    <option value="Sharjah">Sharjah</option>
                                    <option value="Ajman">Ajman</option>
                                    <option value="UAQ">Umm Al Qiween</option>
                                    <option value="RAK">Ras Al Khaimah</option>
                                    <option value="FUJ">Al Fujairah</option>
                                </select>
                            </div>
                            <div className="main-categories">
                                <Categories value={this.state.category} choose={this.handleCategory} />

                            </div>



                            {/* <div className="hero-search-form">
                        <div className="tab-content" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="nav-places" role="tabpanel" aria-labelledby="nav-places-tab">
                                <h6>What are you looking for?</h6>
                              <Search/>
                            
                            </div>
                    
                        </div>
                    </div> */}
                        </div>
                    </div>

                    <div className="sky">

                        <div className="clouds_two"></div>

                    </div>
                </div>

            </section>
            {/* Do your magic for subcategories  */}
            <div>
                <div className="row h-100">
                    <div className="col-2 side-subcat">

                    <div><img class="side-subcat-img" src="img/subcats-img/dish.svg"/>
                                </div>
                                <div class="side-subcat-inner">
                        {
                           
                            this.state.subcats.map((subcat, i) => {
                                return <div className="mb-2 position-relative" key={i} value={subcat.uname}><span className="side-subcat-circle"></span><img src="img/subcats-item-img/catering.svg"/><p className="mt-3">{subcat.name}</p></div>
                            })
                        }
                        </div>
                    </div>
                    <div className="col-9 container mt-5">
                    <div className="row">
                       
                    <div className="col-6 col-md-4"><div className="subcat-items"></div></div>
                    <div className="col-6 col-md-4"><div className="subcat-items"></div></div>
                    <div className="col-6 col-md-4"><div className="subcat-items"></div></div>
                    <div className="col-6 col-md-4"><div className="subcat-items"></div></div>
                    <div className="col-6 col-md-4"><div className="subcat-items"></div></div>
                    <div className="col-6 col-md-4"><div className="subcat-items"></div></div>
                    <div className="col-6 col-md-4"><div className="subcat-items"></div></div>
                    
                    </div>
                    </div>
                </div>
                </div>
              

            {/* <Tabs>
                <TabList>
                    <Tab>
                        <div><i className="fa fa-hotel fa-2x"></i></div>
                        <b> Hotels</b>
                    </Tab>
                    <Tab>
                        <div><i className="fas fa-utensils fa-2x"></i></div>
                        <b>Restaurants</b>
                    </Tab>
                    <Tab>
                        <div><i className="fa fa-film fa-2x"></i></div>
                        <b>Cinemas</b>
                    </Tab>
                    <Tab>
                        <div><i className="fa fa-spa fa-2x"></i></div>
                        <b> Spa</b></Tab>
                </TabList>

                <TabPanel>
                    <Featured cat="Hotels" />
                </TabPanel>
                <TabPanel>
                    <Featured cat="Restaurant" />
                </TabPanel>
                <TabPanel>
                    <Featured cat="Cinemas" />
                </TabPanel>
                <TabPanel>
                    <Featured cat="Spa" />
                </TabPanel>
            </Tabs>
            <Clients /> */}
        </div>
    }

}