import React, { Component } from 'react';

export class CategoriesSubs extends Component {
    state = {
        FormType: "Add",

        cats: [],
        subcats: [],
        selectedCat: "",
        selectedSubcat: "",

        category: {
            uname: "",
            name: "",
            icon: ""
        },
        subcategory: {
            uname: "",
            name: "",
            icon: ""
        },

        message: "",
        status: false,
        showResult: false,
        showResultLogin: false
    }

    handleCatUnameChange = (e) => {
        this.setState({ selectedCat: e.target.value });
        if (this.state.FormType == "Edit") {
            let ind = this.state.cats.findIndex(x => x.uname === e.target.value);
            this.setState({ category: this.state.cats[ind] });
        }
        this.fillSubs(e.target.value);
    }

    handleCatChange = (e) => {
        let temp = this.state.category;
        temp[e.target.name] = e.target.value;
        this.setState({
            category: temp
        });
        console.log(this.state);
    }

    handleSubcatUnameChange = (e) => {
        this.setState({ selectedSubcat: e.target.value });
        if (this.state.FormType == "Edit") {
            let subcategory = this.state.subcats.findIndex(x => x.uname === e.target.value);
            this.setState({ subcategory: this.state.subcats[subcategory] });
        }
    }

    handleSubcatChange = (e) => {
        let temp = this.state.subcategory;
        temp[e.target.name] = e.target.value;
        this.setState({
            subcategory: temp
        });
    }

    AddUpdateCat = (event) => {
        if (this.state.FormType == "Add") {
            fetch('https://guidestae.herokuapp.com/cats/add', {
                method: 'post',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': sessionStorage["token"]
                }),
                body: JSON.stringify({
                    uname: this.state.category.uname,
                    name: this.state.category.name,
                    icon: this.state.category.icon
                })
            }).then((r) => {
                r.json().then(res => {
                    if (res) {
                        this.setState({
                            message: res.message,
                            status: res.status,
                            showResult: true
                        });
                        if (res.status == true) {
                            this.setState({
                                category: {
                                    uname: "",
                                    name: "",
                                    icon: ""
                                }
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
        } else if (this.state.FormType == "Edit") {
            fetch('https://guidestae.herokuapp.com/cats/update', {
                method: 'post',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': sessionStorage["token"]
                }),
                body: JSON.stringify({
                    uname: this.state.category.uname,
                    name: this.state.category.name,
                    icon: this.state.category.icon
                })
            }).then((r) => {
                r.json().then(res => {
                    if (res) {
                        this.setState({
                            message: res.message,
                            status: res.status,
                            showResult: true
                        });
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
        } else if (this.state.FormType == "Delete" && this.state.category.uname == "DeletePlease") {
            fetch('https://guidestae.herokuapp.com/cats/delete', {
                method: 'post',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': sessionStorage["token"]
                }),
                body: JSON.stringify({
                    uname: this.state.selectedCat
                })
            }).then((r) => {
                r.json().then(res => {
                    if (res) {
                        this.setState({
                            message: res.message,
                            status: res.status,
                            showResult: true
                        });
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
        }
        event.preventDefault();
    }

    AddUpdateSubcat = (event) => {
        if (this.state.FormType == "Add") {
            fetch('https://guidestae.herokuapp.com/subcats/add', {
                method: 'post',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': sessionStorage["token"]
                }),
                body: JSON.stringify({
                    catname: this.state.selectedCat,
                    uname: this.state.subcategory.uname,
                    name: this.state.subcategory.name,
                    icon: this.state.subcategory.icon
                })
            }).then((r) => {
                r.json().then(res => {
                    if (res) {
                        this.setState({
                            message: res.message,
                            status: res.status,
                            showResult: true
                        });
                        if (res.status == true) {
                            this.setState({
                                subcategory: {
                                    uname: "",
                                    name: "",
                                    icon: ""
                                }
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
        } else if (this.state.FormType == "Edit") {
            fetch('https://guidestae.herokuapp.com/subcats/update', {
                method: 'post',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': sessionStorage["token"]
                }),
                body: JSON.stringify({
                    uname: this.state.subcategory.uname,
                    name: this.state.subcategory.name,
                    icon: this.state.subcategory.icon
                })
            }).then((r) => {
                r.json().then(res => {
                    if (res) {
                        this.setState({
                            message: res.message,
                            status: res.status,
                            showResult: true
                        });
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
        } else if (this.state.FormType == "Delete" && this.state.subcategory.uname == "DeletePlease") {
            fetch('https://guidestae.herokuapp.com/subcats/delete', {
                method: 'post',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': sessionStorage["token"]
                }),
                body: JSON.stringify({
                    uname: this.state.selectedSubcat
                })
            }).then((r) => {
                r.json().then(res => {
                    if (res) {
                        this.setState({
                            message: res.message,
                            status: res.status,
                            showResult: true
                        });
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
        }
        event.preventDefault();
    }

    changeFormType = (e) => {
        this.setState({ FormType: e.target.value });
        if (e.target.value == "Add") {
            this.setState({
                category: {
                    uname: "",
                    name: "",
                    icon: ""
                },
                subcategory: {
                    uname: "",
                    name: "",
                    icon: ""
                }
            });
        } else {
            let category = this.state.cats.findIndex(x => x.uname === this.state.selectedCat);
            let subcategory = this.state.subcats.findIndex(x => x.uname === this.state.selectedSubcat);
            this.setState({ category: this.state.cats[category], subcategory: this.state.subcats[subcategory] });
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
                    selectedSubcat: r.Subcategories[0].uname
                });
                if (this.state.FormType == "Edit") {
                    this.setState({
                        subcategory: r.Subcategories[0],
                    });
                }
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
                    selectedCat: r.Categories[0].uname
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
                                            <option value="Delete">Delete</option>
                                        </select>
                                    </div>
                                </div>
                                <form onSubmit={this.AddUpdateCat} style={{ borderBottom: "2px solid white", marginBottom: "20px", paddingBottom: "20px" }}>
                                    <div className="clear mb-3">
                                        <span className="col-md-3" style={{ float: 'left', color: "white" }}>Category:</span>
                                        <div className="col-md-9" style={{ float: 'left' }}>
                                            <select value={this.state.selectedCat} onChange={this.handleCatUnameChange} className="custom-select">
                                                {
                                                    this.state.cats.map((cat, i) => {
                                                        return <option key={i} value={cat.uname}>{cat.name}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <input className="input-control mb-2" type="text" disabled={this.state.FormType == "Edit" ? true : false} name="uname" placeholder="Unique name (One word)" value={this.state.category.uname} onChange={this.handleCatChange} />
                                    <input className="input-control mb-2" type="text" name="name" placeholder="Category full name" value={this.state.category.name} onChange={this.handleCatChange} />
                                    <input className="input-control mb-2" type="text" name="icon" placeholder="Icon" value={this.state.category.icon} onChange={this.handleCatChange} />
                                    <input className="input-control mb-2" type="submit" value={this.state.FormType + " Category"} style={{ backgroundColor: "#da4444", color: "white", border: 0 }} />
                                </form>
                                <form onSubmit={this.AddUpdateSubcat}>
                                    <div className="clear mb-3">
                                        <span className="col-md-3" style={{ float: 'left', color: "white" }}>Subcategory:</span>
                                        <div className="col-md-9" style={{ float: 'left' }}>
                                            <select value={this.state.selectedSubcat} onChange={this.handleSubcatUnameChange} className="custom-select">
                                                {
                                                    this.state.subcats.map((subcat, i) => {
                                                        return <option key={i} value={subcat.uname}>{subcat.name}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <input className="input-control mb-2" type="text" disabled={this.state.FormType == "Edit" ? true : false} name="uname" placeholder="Unique name (One word)" value={this.state.subcategory.uname} onChange={this.handleSubcatChange} />
                                    <input className="input-control mb-2" type="text" name="name" placeholder="Full name of the item" value={this.state.subcategory.name} onChange={this.handleSubcatChange} />
                                    <input className="input-control mb-2" type="text" name="icon" placeholder="Icon" value={this.state.subcategory.icon} onChange={this.handleSubcatChange} />
                                    <input className="input-control mb-2" type="submit" value={this.state.FormType + " Subcategory"} style={{ backgroundColor: "#da4444", color: "white", border: 0 }} />
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
        <span style={{ color: props.status ? "green" : "red", fontSize: "25px" }}>{props.message}</span>
    </div>
}

