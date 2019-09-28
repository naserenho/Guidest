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
        itemsDisplay: [],

        pageIndex: 0,
        pageSize: 6,

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
    }

    changePageIndex = (i) => {
        let itemsDisplay = this.state.items.slice(i * this.state.pageSize, (i * this.state.pageSize) + this.state.pageSize);
        this.setState({
            pageIndex: i,
            itemsDisplay: []
        });
        setTimeout(
            function () {
                this.setState({
                    itemsDisplay: itemsDisplay
                });
            }
                .bind(this),
            1000
        );
    }

    fillItems = (e, t) => {
        this.setState({
            items: [],
            itemsDisplay: [],
            loadingItems: true
        });
        fetch(`https://guidestae.herokuapp.com/items/get/${e}/${t}`, {
            method: 'get',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            })
        }).then((res) => {
            res.json().then(r => {
                setTimeout(
                    function () {
                        let itemsDisplay = r.items.slice(this.state.pageIndex * this.state.pageSize, (this.state.pageIndex * this.state.pageSize) + this.state.pageSize);
                        this.setState({
                            items: r.items,
                            itemsDisplay: itemsDisplay,
                            loadingItems: false
                        });
                    }
                        .bind(this),
                    1000
                );

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
                    <div className="col-md-2 side-subcat">

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
                        {loadingItems && <div style={{ top: "30px", position: "absolute", left: "50%", transform: "translateX(-50%)" }}><img className="side-subcat-img" src="img/loading.svg" /></div>}
                        <div className="row">
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
                            {
                                this.state.items.length > 0 ? <div style={{ display: "flex" }}>
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
                                            this.changePageIndex(i)
                                        }} /></div>
                                    : null
                            }
                        </div>
                        <div className="row">
                            {
                                this.state.items.length > 0 ?
                                    this.state.itemsDisplay.map((item, ind) => {
                                        return <ListItem subcatIcon={this.state.subcats[this.state.subcats.findIndex(x => x.uname === this.state.subcategory)].icon} key={ind} obj={item} />
                                    }) : !loadingItems && <div style={{ textAlign: "center", fontSize: "24px", fontWeight: "bold" }}>No items yet to display in {this.state.subcategory} for city {this.state.city}</div>
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
        return <div className="col-md-4"><div className="subcat-items">
            <div className="post-module hover border">
                <div className="thumbnail">
                    <div className="poster-img" style={{ backgroundImage: "url(" + (this.state.photo) + ")" }}>

                        <div className="rating"><i className="fa fa-star"></i>  {this.state.result.rating}</div>
                        <div className="location"><a href={this.state.result.url}>
                            <i className="fas fa-map-pin"></i> Location</a></div>
                    </div>
                </div>

                <div className="post-content">
                    <div className="subcategory">
                        <div className="subcategory-img-item"><img src={"img/subcats-item-img/" + this.props.subcatIcon} />
                        </div>
                    </div>
                    <h1 className="title">{this.props.obj.name}</h1>
                    <div className="description">

                        <span>{this.props.obj.city}</span>

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
    }

}