import React, { Component } from 'react';
import { Categories } from './Categories';
import Pagination from 'pagination-component';

import "react-tabs/style/react-tabs.css";

export class Main extends Component {
    state = {
        category: "",
        subcategory: "",
        subcats: [],
        city: "All",
        items: [],

        pageIndex: 0,
        pageSize: 10,

        loadingItems: false
    }

    changeCity = (e) => {
        this.setState({ city: e.target.value });
        if (e.target.value && this.state.subcategory) {
            this.fillItems(this.state.subcategory, e.target.value);
        }
    }

    changePageSize = (e) => {
        this.setState({ pageSize: e.target.value, pageIndex: 0 });
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
                    subcategory: r.Subcategories[0].uname,
                    icons: r.Subcategories[0].icon

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
        this.setState({ subcategory: subcat, pageIndex: 0, loadingItems: true });
        if (subcat && this.state.city) {
            this.fillItems(subcat, this.state.city);
        }
        this.setState({ loadingItems: false });
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
        const { loadingItems } = this.state;
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
            <div style={this.state.subcategory ? { display: "" } : { display: "None" }}>
                <div className="row h-100">
                    <div className="col-2 side-subcat">

                        <div><img className="side-subcat-img" src="img/subcats-img/dish.svg" />
                        </div>
                        <div className="side-subcat-inner">
                            {
                                this.state.subcats.map((subcat, i) => {
                                    return <div className="mb-2 position-relative" key={i} data-id={subcat.uname} onClick={this.handleSubcategory.bind(this)}>
                                        <span className={"side-subcat-circle circle spin" + (this.state.subcategory == subcat.uname ? " ColoredSubCat" : "")}> <img src={"img/subcats-item-img/" + subcat.icon} /></span>

                                        <p className="mt-3">{subcat.name}</p>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                    <div className="col-9 container mt-5">
                        <div className="row">
                            {
                                this.state.items.length > 0 ? <div style={{display: "flex"}}>
                                    <span >Page Size:</span>
                                    <div>
                                        <select value={this.state.pageSize} onChange={this.changePageSize}>
                                            <option value="6">6</option>
                                            <option value="10">10</option>
                                            <option value="20">20</option>
                                        </select>
                                    </div>
                                    <Pagination currentPage={this.state.pageIndex}
                                    pageCount={Math.ceil(this.state.items.length / this.state.pageSize)}
                                    pageLinkClassName="pageLink"
                                    currentLinkClassName="currentLink"
                                    onPageClick={i => {
                                        this.setState({
                                            pageIndex: i
                                        });
                                        //console.log(`Link to page ${i} was clicked.`);
                                    }} /></div>
                                    : null
                            }
                        </div>
                        <div className="row">
                            { loadingItems && <i className="fa fa-refresh fa-spin" /> }
                            {
                                this.state.items.length > 0 ?
                                    this.state.items.slice(this.state.pageIndex * this.state.pageSize, (this.state.pageIndex * this.state.pageSize) + this.state.pageSize).map((item, ind) => {
                                        return <ListItem subcatIcon={this.state.subcats[this.state.subcats.findIndex(x => x.uname === this.state.subcategory)].icon} key={ind} obj={item} />
                                    }) : <div>No items yet in {this.state.subcategory} and {this.state.city}</div>
                            }
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
        let tags = this.props.obj.tags.split(',');
        //console.log(tags);
        return <div className="col-md-4"><div className="subcat-items">
            <div className="post-module hover border">
                <div className="thumbnail">
                    <div className="poster-img" style={{ backgroundImage: "url(" + (this.state.photo) + ")" }}>
                        <div className="subcategory">
                            <div className="subcategory-img-item"><img src={"img/subcats-item-img/" + this.props.subcatIcon} />
                            </div>
                        </div>
                        <div className="rating"><i className="fa fa-star"></i>  {this.state.result.rating}</div>
                    </div>
                </div>

                <div className="post-content">

                    <h1 className="title">{this.props.obj.name}</h1>
                    <div className="description">

                        <span>{this.props.obj.city}</span>
                        <a href={this.state.result.url} className="item-location">
                            <i className="fas fa-map-pin"></i> Location</a>
                        <div>
                            {
                                tags.map((tag, i) => {
                                    let trimmedTag = tag.trim();
                                    return <span key={i} data-tag={trimmedTag.replace(' ', '-')} className="items-tags">{tag}</span>

                                })
                            }
                        </div>
                    </div>
                    <hr />
                    <button className="button">Show more</button>


                </div>
            </div></div></div>
















        // <div className="col-6 col-md-4">
        //     <div className="subcat-items">
        //         <img src={this.state.photo} alt="" />

        //         <div className="price-start">
        //             {/* this.state.result.photos[0].html_attributions[0] */}
        //             <p><i className="fa fa-star"></i>  {this.state.result.rating}</p>
        //         </div>

        //         <div className="feature-content d-flex align-items-center justify-content-between">
        //             <div className="feature-title">
        //                 <h5>{this.props.obj.name}</h5>
        //                 <p>{this.props.obj.city}</p>
        //                 <p>{this.props.obj.tags}</p>
        //                 {/* <p>{this.state.openingTimes}</p> */}



        //                 <a href={this.state.result.url}><i className="fas fa-map-pin"></i> {this.state.result.formatted_address}</a>


        //             </div>
        //             <div className="feature-favourite">
        //                 <a href="#"><i className="far fa-heart" aria-hidden="true"></i></a>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    }

}