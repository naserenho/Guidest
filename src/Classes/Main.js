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

    // handleSubcategory = (e) => {
    //     this.setState({ subcategory: e.target.value });
    //     if (e.target.value && this.state.city) {
    //         this.fillItems(e.target.value, this.state.city);
    //     }
    // }

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

    handleSubcategory = (e) => {
        let subcat = e.currentTarget.dataset.id;
        this.setState({ subcategory: subcat });
        if (subcat && this.state.city) {
            this.fillItems(subcat, this.state.city);
        }
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

                        <div><img className="side-subcat-img" src="img/subcats-img/dish.svg" />
                        </div>
                        <div className="side-subcat-inner">
                            {
                                this.state.subcats.map((subcat, i) => {
                                    return <div className="mb-2 position-relative" key={i} data-id={subcat.uname} onClick={this.handleSubcategory.bind(this)}>
                                        <span className={"side-subcat-circle" + (this.state.subcategory == subcat.uname ? " ColoredSubCat" : "")}></span>
                                        <img src="img/subcats-item-img/catering.svg" />
                                        <p className="mt-3">{subcat.name}</p>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                    <div className="col-9 container mt-5">
                        <div className="row">
                            {
                                this.state.items.length > 0 ? this.state.items.map((item, ind) => {
                                    return <ListItem key={ind} obj={item} />
                                }) : <div>No items yet in {this.state.subcategory} and {this.state.city}</div>
                            }
                            {/* <div className="col-6 col-md-4"><div className="subcat-items"></div></div>
                            <div className="col-6 col-md-4"><div className="subcat-items"></div></div>
                            <div className="col-6 col-md-4"><div className="subcat-items"></div></div>
                            <div className="col-6 col-md-4"><div className="subcat-items"></div></div>
                            <div className="col-6 col-md-4"><div className="subcat-items"></div></div>
                            <div className="col-6 col-md-4"><div className="subcat-items"></div></div>
                            <div className="col-6 col-md-4"><div className="subcat-items"></div></div> */}
                        </div>
                    </div>
                </div>
            </div>
            {/* <Featured subcat={this.state.subcategory} city={this.state.city} items={this.state.items} /> */}
        </div>
    }

}



class ListItem extends Component {
    state = {
        result: {},
        photo: ""
    }

    componentDidMount() {
        if (this.props.obj.placeID) {
            const proxyurl = "https://cors-anywhere.herokuapp.com/";
            const url = `https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyBB3rwynTACfkRD28Ld2TE7sTdsHIv8qJY&placeid=${this.props.obj.placeID}&fields=address_component,rating,adr_address,alt_id,formatted_address,geometry,icon,id,name,permanently_closed,photo,place_id,plus_code,scope,type,url,utc_offset,vicinity`;
            fetch(proxyurl + url, {
                method: 'get',

                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',


                })
            }).then((res) => {
                res.json().then(r => {
                    this.setState({
                        result: r.result,
                        photo: `https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyBB3rwynTACfkRD28Ld2TE7sTdsHIv8qJY&photoreference=${r.result.photos[0].photo_reference}&maxheight=500`
                    });
                }).catch(err => {
                    console.log("Inside google APIs error.");
                    console.log(err);
                });
            }).catch(err => {
                console.log("The google APIs are not working.");
                console.log(err);
            });
        }
    }

    render() {
        return <div className="col-6 col-md-4">
            <div className="subcat-items">
                <img src={this.state.photo} alt="" />

                <div className="price-start">
                    {/* this.state.result.photos[0].html_attributions[0] */}
                    <p><i className="fa fa-star"></i>  {this.state.result.rating}</p>
                </div>

                <div className="feature-content d-flex align-items-center justify-content-between">
                    <div className="feature-title">
                        <h5>{this.props.obj.name}</h5>
                        <p>{this.props.obj.city}</p>
                        <p>{this.props.obj.tags}</p>
                        {/* <p>{this.state.openingTimes}</p> */}



                        <a href={this.state.result.url}><i className="fas fa-map-pin"></i> {this.state.result.formatted_address}</a>


                    </div>
                    <div className="feature-favourite">
                        <a href="#"><i className="far fa-heart" aria-hidden="true"></i></a>
                    </div>
                </div>
            </div>
        </div>
    }

}