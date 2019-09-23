import React, { Component } from 'react';
import { Featured, SingleFeature } from './Featured';
import { Categories } from './Categories';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Clients } from './Clients';

import "react-tabs/style/react-tabs.css";

export class Main extends Component {
    state = {
        category: "",
        subcategory: "",
        subcats: [],
        city: "All",
        items: []
    }

    changeCity = (e) => {
        this.setState({ city: e.target.value });
        if (e.target.value && this.state.subcategory) {
            this.fillItems(this.state.subcategory, e.target.value);
        }
    }

    handleCategory = (e) => {
        this.setState({ category: e });
        this.fillSubs(e);
    }

    handleSubcategory = (e) => {
        this.setState({ subcategory: e.target.value });
        if (e.target.value && this.state.city) {
            this.fillItems(e.target.value, this.state.city);
        }
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
                    subcats: r.Subcategories,
                    subcategory: r.Subcategories[0].uname
                });
                if (r.Subcategories[0].uname && this.state.city) {
                    this.fillItems(r.Subcategories[0].uname, this.state.city);
                }
            }).catch(err => {
                this.setState({
                    // loginstatus: false,
                    // showResultLogin: true
                });
            });
        });
    }

    fillItems = (e, t) => {
        fetch(`https://guidestae.herokuapp.com/items/get/${e}/${t}`, {
            method: 'get',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            })
        }).then((res) => {
            res.json().then(r => {
                this.setState({
                    items: r.items
                });
            }).catch(err => {

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
                                    <option value="All">Your Destinations</option>
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
                                {/* Do your magic for subcategories  */}
                                <select value={this.state.subcategory} onChange={this.handleSubcategory} className="custom-select">
                                    {
                                        this.state.subcats.map((subcat, i) => {
                                            return <option key={i} value={subcat.uname}>{subcat.name}</option>
                                        })
                                    }
                                </select>
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
            <Featured subcat={this.state.subcategory} city={this.state.city} items={this.state.items} />
        </div>
    }

}