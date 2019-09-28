import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export class SignInRegister extends Component {
    state = {
        name: "",
        email: "",
        password: "",
        loginemail: "",
        loginpassword: "",
        message: "",
        token: "",
        userRole: "",
        status: false,
        loginstatus: false,
        showResult: false,
        showResultLogin: false,

        redirect: false,
        loadingLogin: false,
        loadingRegister: false
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }
    }

    login = (event) => {
        this.setState({ loadingLogin: true });
        fetch('https://guidestae.herokuapp.com/users/login', {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                email: this.state.loginemail || this.state.email,
                password: this.state.loginpassword || this.state.password
            })
        }).then((res) => {
            res.json().then(r => {
                if (r.token !== undefined) {
                    this.setState({
                        token: r.token,
                        loginname: r.name,
                        userRole: r.roleType,
                        loginstatus: true,
                        showResultLogin: true
                    });
                    this.props.handleLogin(this.state);
                    this.setRedirect(); //After logging in, set redirect to true so we go to main page
                    // this.props.history.push("/");
                }
                else
                    this.setState({
                        loginstatus: false,
                        showResultLogin: true
                    });
            }).catch(err => {
                console.log(err);
                this.setState({
                    loginstatus: false,
                    showResultLogin: true
                });
            });
        });
        event.preventDefault();
        //this.setState({ loadingLogin: false });
    }

    register = (event) => {
        this.setState({ loadingRegister: true });
        fetch('https://guidestae.herokuapp.com/users/register', {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        }).then((res) => {
            res.json().then(r => {
                if (r.username !== undefined) {
                    this.setState({
                        message: "Register successful",
                        status: true,
                        showResult: true
                    });
                    this.login();
                    // this.props.handleRegister(this.state);
                }
                else
                    this.setState({
                        message: r.message,
                        status: false,
                        showResult: true
                    });
            }).catch(err => {
                this.setState({
                    message: "Response couldn't be parsed",
                    status: false,
                    showResult: true
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
        //this.setState({ loadingRegister: false });
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { loadingLogin } = this.state;
        const { loadingRegister } = this.state;
        return <div>
            {this.renderRedirect()}
            <section className="bg-overlay" style={{ paddingTop: "130px", backgroundImage: "url(img/bg-img/hero-1.jpg)", backgroundSize: "cover", backgroundPosition: "center" }}>
                <div className="row m-0 align-items-center justify-content-center" >
                    <div className="col-12 col-md-5">
                        <div id="login-form" className="px-5">
                            <p className="text-white">Existing User</p>
                            <form onSubmit={this.login}>
                                <input className="input-control mb-2" type="email" placeholder="Email" name="loginemail" value={this.state.loginemail} onChange={this.handleChange} />
                                <input className="input-control mb-2" type="password" placeholder="Password" name="loginpassword" value={this.state.loginpassword} onChange={this.handleChange} />
                                <input className="input-control mb-2" type="submit" value="Login" disabled={loadingLogin} style={{ backgroundColor: "#3c0ea5", color: "white", border: 0 }} />
                            </form>
                            {this.state.showResultLogin ? <Info status={this.state.loginstatus} name={this.state.loginname} token={this.state.token} /> : ""}
                        </div>
                        <div id="registration-form" className="px-5 mt-3" >
                            <p className="text-white">New User?</p>
                            <form onSubmit={this.register}>
                                <input className="input-control mb-2" type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
                                <br />
                                <input className="input-control mb-2" type="text" name="name" placeholder="Username" value={this.state.name} onChange={this.handleChange} />
                                <br />
                                <input className="input-control mb-2" type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                                <br />
                                <input className="input-control mb-2" type="submit" value="Register" disabled={loadingRegister} style={{ backgroundColor: "#da4444", color: "white", border: 0 }} />
                            </form>
                            {this.state.showResult ? <RegisterInfo status={this.state.status} name={this.state.name} message={this.state.message} /> : ""}
                            <br /><br />
                        </div>
                    </div>
                </div>
            </section>
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

const RegisterInfo = (props) => {
    return <div>
        <span style={{ color: props.status ? "green" : "red" }}>{props.message}</span>
    </div>
}

