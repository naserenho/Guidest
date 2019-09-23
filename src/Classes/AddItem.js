import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export class ItemDetailsForm extends Component {
    state = {
        cats: [],
        subcats: [],
        cat: "",
        uname: this.props.match.params.itemName,
        name: "",
        type: "",
        link: "",
        placeID: "",
        city: "",
        subcat: "",
        tags: "",
        email: "",
        contact: "",
        price: "",

        loginemail: "",
        loginpassword: "",
        message: "",
        token: "",
        status: false,
        loginstatus: false,
        showResult: false,
        showResultLogin: false
    }

    AddItem = (event) => {
        fetch('https://guidestae.herokuapp.com/items/add', {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage["token"]
            }),
            body: JSON.stringify({
                uname: this.state.uname,
                name: this.state.name,
                type: this.state.type,
                link: this.state.link,
                placeID: this.state.placeID,
                city: this.state.city,
                subcat: this.state.subcat,
                tags: this.state.tags,
                email: this.state.email,
                contact: this.state.contact,
                price: this.state.price
            })
        }).then((r) => {
            r.json().then(res => {
                if (res) {
                    this.setState({
                        message: res.message,
                        status: res.status,
                        showResult: true
                    });
                    console.log(res.status);
                    if (res.status == true) {
                        this.setState({
                            uname: "",
                            name: "",
                            link: "",
                            placeID: "",
                            email: "",
                            contact: "",
                            price: "",
                            tags: ""
                        });
                    }
                }
            }).catch(err => {
                this.setState({
                    loginstatus: false,
                    showResultLogin: true
                });
            });
        }).catch(err => {
            this.setState({
                message: "Server isn't responding",
                status: false,
                showResult: true
            });
        });
        event.preventDefault();
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleCatChange = (e) => {
        this.setState({ cat: e.target.value });
        this.fillSubs(e.target.value);
    }

    changeType = (e) => {
        this.setState({ type: e.target.value });
    }

    handleSubcatChange = (e) => {
        this.setState({ subcat: e.target.value });
    }

    changeCity = (e) => {
        this.setState({ city: e.target.value });
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
                    subcat: r.Subcategories[0].uname
                });
            }).catch(err => {
                this.setState({
                    // loginstatus: false,
                    // showResultLogin: true
                });
            });
        });
    }

    componentDidMount() {
        fetch('https://guidestae.herokuapp.com/cats/get', {
            method: 'get',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then((res) => {
            res.json().then(r => {
                this.setState({
                    cats: r.Categories,
                    cat: r.Categories[0].uname
                });

                if (this.state.uname) {
                    // Fill in the categories and the item details
                }
                this.fillSubs(r.Categories[0].uname);
            }).catch(err => {
                this.setState({
                    loginstatus: false,
                    showResultLogin: true
                });
            });
        });
    }

    render() {
        return <div>
            <div>
                <section className="bg-overlay" style={{ paddingTop: "130px", backgroundColor: "#8a53a0", backgroundImage: "url(img/bg-img/hero-1.jpg)", backgroundSize: "cover", backgroundPosition: "center" }}>
                    <div className="row m-0 align-items-center justify-content-center" >
                        <div className="col-12 col-md-5">
                            <div id="registration-form" className="px-5 mt-3" >
                                <form onSubmit={this.AddItem}>
                                    <div>
                                        <span style={{ width: "20%", float: 'left', color: "white" }}>Category:</span>
                                        <div style={{ width: "80%", float: 'left' }}>
                                            <select value={this.state.cat} onChange={this.handleCatChange} className="custom-select">
                                                {
                                                    this.state.cats.map((cat, i) => {
                                                        return <option key={i} value={cat.uname}>{cat.name}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <br />
                                    <div>
                                        <span style={{ width: "20%", float: 'left', color: "white" }}>Subcategory:</span>
                                        <div style={{ width: "80%", float: 'left' }}>
                                            <select value={this.state.subcat} onChange={this.handleSubcatChange} className="custom-select">
                                                {
                                                    this.state.subcats.map((subcat, i) => {
                                                        return <option key={i} value={subcat.uname}>{subcat.name}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <br />
                                    <div>
                                        <span style={{ width: "20%", float: 'left', color: "white" }}>City:</span>
                                        <div style={{ width: "80%", float: 'left' }}>
                                            <select value={this.state.city} onChange={this.changeCity} className="custom-select">
                                                <option value="All">Not specific</option>
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
                                    </div>
                                    <br />
                                    <div>
                                        <span style={{ width: "20%", float: 'left', color: "white" }}>Type:</span>
                                        <div style={{ width: "80%", float: 'left' }}>
                                            <select value={this.state.type} onChange={this.changeType} className="custom-select">
                                                <option value="Offline">Offline</option>
                                                <option value="Online">Online</option>
                                            </select>
                                        </div>
                                    </div>
                                    <br />
                                    <input className="input-control mb-2" type="text" name="uname" placeholder="Unique name (One word)" value={this.state.uname} onChange={this.handleChange} />
                                    <br />
                                    <input className="input-control mb-2" type="text" name="name" placeholder="Full name of the item" value={this.state.name} onChange={this.handleChange} />
                                    <br />
                                    <input className="input-control mb-2" type="text" name="link" placeholder="Link URL" value={this.state.link} onChange={this.handleChange} />
                                    <br />
                                    <input className="input-control mb-2" type="text" name="placeID" placeholder="Google Place ID" value={this.state.placeID} onChange={this.handleChange} />
                                    <br />
                                    <input className="input-control mb-2" type="email" name="email" placeholder="Contact Email" value={this.state.email} onChange={this.handleChange} />
                                    <br />
                                    <input className="input-control mb-2" type="text" name="contact" placeholder="Contact Phone(s)" value={this.state.contact} onChange={this.handleChange} />
                                    <br />
                                    <input className="input-control mb-2" type="text" name="price" placeholder="Price value/ranges" value={this.state.price} onChange={this.handleChange} />
                                    <br />
                                    <input className="input-control mb-2" type="text" name="tags" placeholder="Tags comma separated" value={this.state.tags} onChange={this.handleChange} />
                                    <br />
                                    <input className="input-control mb-2" type="submit" value="Add Item" style={{ backgroundColor: "#da4444", color: "white", border: 0 }} />
                                </form>
                                {this.state.showResult ? <AddInfo status={this.state.status} name={this.state.name} message={this.state.message} /> : ""}
                                <br /><br />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    }
}

export const Info = (props) => {
    return <div>
        <span style={{ color: props.status ? "green" : "red" }}>{props.status ? "Login Successful" : "Failed to Login"}</span>
        {props.status ? <h3>Welcome User {props.name}</h3> : ""}
        {/* {props.status ? <h3>Your token {props.token}</h3> : "" } */}
    </div>
}

const AddInfo = (props) => {
    return <div>
        <span style={{ color: props.status ? "green" : "red" }}>{props.message}</span>
    </div>
}

