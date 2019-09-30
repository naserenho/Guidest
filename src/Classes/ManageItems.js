import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export class ItemDetailsForm extends Component {
    state = {
        FormType: "Add",
        ItemToEdit: "",
        ItemsEdit: [],

        cats: [],
        subcats: [],
        cat: "",
        uname: "",
        name: "",
        type: "Offline",
        link: "",
        placeID: "",
        city: "All",
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

    AddUpdateItem = (event) => {
        if (this.state.FormType == "Add") {
            fetch('https://guidestae.herokuapp.com/items/add', {
                method: 'post',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': sessionStorage["token"]
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
                        //console.log(res.status);
                        if (res.status == true) {
                            let items = this.state.ItemsEdit;
                            items.append({
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
                            });
                            this.setState({
                                ItemsEdit: items
                            });
                            this.emptyForm();
                            setTimeout(
                                function () {
                                    this.setState({
                                        message: "",
                                        status: "",
                                        showResult: false
                                    });
                                }
                                    .bind(this),
                                4000
                            );
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
                setTimeout(
                    function () {
                        this.setState({
                            message: "",
                            status: "",
                            showResult: false
                        });
                    }
                        .bind(this),
                    4000
                );
            });
        } else if (this.state.FormType == "Edit") {
            fetch('https://guidestae.herokuapp.com/items/update', {
                method: 'post',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': sessionStorage["token"]
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
                        //console.log(res.status);
                        if (res.status == true) {
                            let temp = this.state.ItemsEdit;
                            let index = temp.findIndex(x => x.uname === this.state.ItemToEdit);
                            let item = temp[index];
                            item.name = this.state.name;
                            item.link = this.state.link;
                            item.placeID = this.state.placeID;
                            item.email = this.state.email;
                            item.contact = this.state.contact;
                            item.price = this.state.price;
                            item.tags = this.state.tags;
                            temp[index] = item;
                            this.setState({
                                ItemsEdit: temp
                            });
                            setTimeout(
                                function () {
                                    this.setState({
                                        message: "",
                                        status: "",
                                        showResult: false
                                    });
                                }
                                    .bind(this),
                                4000
                            );
                            //this.emptyForm();
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
                setTimeout(
                    function () {
                        this.setState({
                            message: "",
                            status: "",
                            showResult: false
                        });
                    }
                        .bind(this),
                    4000
                );
            });
        }
        event.preventDefault();
    }

    emptyForm = () => {
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
        if (this.state.FormType == "Edit") {
            this.fillItems(e.target.value);
        }
    }

    changeCity = (e) => {
        this.setState({ city: e.target.value });
    }

    changeFormType = (e) => {
        this.setState({ FormType: e.target.value });
        if (e.target.value == "Edit") {
            this.fillItems(this.state.subcat);
        }
    }

    handleItemToEdit = (e) => {
        this.setState({ ItemToEdit: e.target.value });
        //GET index of item from uname
        let index = this.state.ItemsEdit.findIndex(x => x.uname === e.target.value);
        this.fillFormItem(this.state.ItemsEdit[index]);
        console.log(this.state.ItemsEdit[index]);
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
                if (this.state.FormType == "Edit") {
                    this.fillItems(r.Subcategories[0].uname);
                }
            }).catch(err => {
                this.setState({
                    // loginstatus: false,
                    // showResultLogin: true
                });
            });
        });
    }

    fillItems = (subcat) => {
        fetch('https://guidestae.herokuapp.com/items/edit', {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': sessionStorage["token"]
            }),
            body: JSON.stringify({
                subcat: subcat
            })
        }).then((res) => {
            res.json().then(r => {
                if (r.items.length > 0) {
                    this.setState({
                        ItemsEdit: r.items,
                        ItemToEdit: r.items[0].uname
                    });
                    this.fillFormItem(r.items[0]);
                } else {
                    this.setState({
                        ItemsEdit: [],
                        ItemToEdit: ""
                    });
                    this.emptyForm();
                }
            }).catch(err => {
                console.log(err);
            });
        }).catch(err => {
            console.log(err);
        });
    }

    fillFormItem = (itemDetails) => {
        this.setState({
            uname: itemDetails.uname,
            name: itemDetails.name,
            type: itemDetails.type,
            link: itemDetails.link,
            placeID: itemDetails.placeID,
            city: itemDetails.city,
            tags: itemDetails.tags,
            email: itemDetails.email,
            contact: itemDetails.contact,
            price: itemDetails.price
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
                                <div style={{ borderBottom: "2px solid white", display: "flex", marginBottom: "20px", paddingBottom: "20px" }}>
                                    <span style={{ width: "20%", float: 'left', color: "white" }}>ITEM ACTION:</span>
                                    <div style={{ width: "80%", float: 'left' }}>
                                        <select value={this.state.FormType} onChange={this.changeFormType} className="custom-select">
                                            <option value="Add">Add</option>
                                            <option value="Edit">Edit</option>
                                        </select>
                                    </div>
                                </div>
                                <form onSubmit={this.AddUpdateItem}>
                                    <div className="clear mb-3">
                                        <span className="col-md-3" style={{ float: 'left', color: "white" }}>Category:</span>
                                        <div className="col-md-9" style={{ float: 'left' }}>
                                            <select value={this.state.cat} onChange={this.handleCatChange} className="custom-select">
                                                {
                                                    this.state.cats.map((cat, i) => {
                                                        return <option key={i} value={cat.uname}>{cat.name}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="clear mb-3">
                                        <span className="col-md-3" style={{ float: 'left', color: "white" }}>Subcategory:</span>
                                        <div className="col-md-9" style={{ float: 'left' }}>
                                            <select value={this.state.subcat} onChange={this.handleSubcatChange} className="custom-select">
                                                {
                                                    this.state.subcats.map((subcat, i) => {
                                                        return <option key={i} value={subcat.uname}>{subcat.name}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    {
                                        this.state.FormType == "Edit" ? (<div className="clear mb-3" style={{ borderBottom: "2px solid white" }}>
                                            <span className="col-md-3" style={{ float: 'left', color: "white" }}>Items:</span>
                                            <div className="col-md-9" style={{ width: "80%", float: 'left' }}>
                                                <select value={this.state.ItemToEdit} onChange={this.handleItemToEdit} className="custom-select">
                                                    {
                                                        this.state.ItemsEdit.map((Item, i) => {
                                                            return <option key={i} value={Item.uname}>{Item.name}</option>
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>) : ""
                                    }
                                    <div className="clear mb-3">
                                        <span className="col-md-3" style={{ float: 'left', color: "white" }}>City:</span>
                                        <div className="col-md-9" style={{ float: 'left' }}>
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
                                    <div className="clear mb-3">
                                        <span className="col-md-3" style={{ float: 'left', color: "white" }}>Type:</span>
                                        <div className="col-md-9" style={{ float: 'left' }}>
                                            <select value={this.state.type} onChange={this.changeType} className="custom-select">
                                                <option value="Offline">Offline</option>
                                                <option value="Online">Online</option>
                                            </select>
                                        </div>
                                    </div>
                                    <input className="input-control mb-2" type="text" disabled={this.state.FormType == "Edit" ? true : false} name="uname" placeholder="Unique name (One word)" value={this.state.uname} onChange={this.handleChange} />
                                    <input className="input-control mb-2" type="text" name="name" placeholder="Full name of the item" value={this.state.name} onChange={this.handleChange} />
                                    <input className="input-control mb-2" type="text" name="link" placeholder="Link URL" value={this.state.link} onChange={this.handleChange} />
                                    <input className="input-control mb-2" type="text" name="placeID" placeholder="Google Place ID" value={this.state.placeID} onChange={this.handleChange} />
                                    <input className="input-control mb-2" type="email" name="email" placeholder="Contact Email" value={this.state.email} onChange={this.handleChange} />
                                    <input className="input-control mb-2" type="text" name="contact" placeholder="Contact Phone(s)" value={this.state.contact} onChange={this.handleChange} />
                                    <input className="input-control mb-2" type="text" name="price" placeholder="Price value/ranges" value={this.state.price} onChange={this.handleChange} />
                                    <input className="input-control mb-2" type="text" name="tags" placeholder="Tags comma separated" value={this.state.tags} onChange={this.handleChange} />
                                    <input className="input-control mb-2" type="submit" value={this.state.FormType == "Add" ? "Add Item" : "Update Item"} style={{ backgroundColor: "#da4444", color: "white", border: 0 }} />
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

const AddInfo = (props) => {
    return <div>
        <span style={{ fontSize: "35px", fontWeight: "bold", color: props.status ? "#a3ffa3" : "red" }}>{props.message}</span>
    </div>
}

