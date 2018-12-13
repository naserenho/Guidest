import React, { Component } from 'react';

export class SignInRegister extends Component {
    state = {
        email: "",
        name: "",
        password: "",
        message: "",
        token: "",
        status: false,
        showResult: false
    }
    
    login = (event) => {
        fetch('https://guidest.herokuapp.com/users/login',{
        method: 'post',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            email: this.state.email,
            password: this.state.password
        })
        }).then((res) => {
            res.json().then(r => {
                if(r.token !== undefined){
                    this.setState({
                        token: r.token,
                        name: r.name,                
                        status: true,
                        showResult: true
                    });
                    this.props.handleData(this.state);
                }
                else
                    this.setState({
                        status: false,
                        showResult: true
                    });
            }).catch(err =>{
                this.setState({
                    status: false,
                    showResult: true
                });
            });
        });
        event.preventDefault();
    }

    register = (event) => {
   fetch('https://guidest.herokuapp.com/users/register',{
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
            if(r.name !== undefined){
                this.setState({
                    message: "Register successful",                
                    status: true,
                    showResult: true
                });
                this.props.handleRegister(this.state);
            }
            else
                this.setState({
                    message: r.message,
                    status: false,
                    showResult: true
                });
        }).catch(err =>{
            this.setState({
                message: "Response couldn't be parsed",
                status: false,
                showResult: true
           });
        });
   }).catch(err =>{
    this.setState({
        message: "Server isn't responding",
        status: false,
        showResult: true
   });
});
   event.preventDefault();
    }
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }
    render() {
        return <div>
            <div>
                <form onSubmit={this.register}>
                    <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
                    <br />
                    <input type="text" name="name" placeholder="Username" value={this.state.name} onChange={this.handleChange} />
                    <br />
                    <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                    <br />
                    <input type="submit" value="Register" />
                </form>
                {this.state.showResult ? <RegisterInfo status={this.state.status} name={this.state.name} message={this.state.message} /> : "" }
                <br/><br/>
            </div>
            <div>
                <form onSubmit={this.login}>
                    <input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    <input type="submit" value="Login" />
                </form>
                {this.state.showResult ? <Info status={this.state.status} name={this.state.name} token={this.state.token} /> : "" }
            </div>
        </div>
    }
}

const Info = (props) =>{
    return <div>
        <span style={{color:props.status?"green":"red"}}>{props.status ? "Login Successful" : "Failed to Login"}</span>
        {props.status ? <h3>Welcome User {props.name}</h3> : "" }
        {props.status ? <h3>Your token {props.token}</h3> : "" }
    </div>
}

const RegisterInfo = (props) =>{
    return <div>
        <span style={{color:props.status?"green":"red"}}>{props.message}</span>
        {props.status ? <h3>Welcome User {props.name}</h3> : "" }
    </div>
}

