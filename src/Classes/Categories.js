import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Categories extends Component {

    state = {
        value: "",
        categories: []
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
                    categories: r.Categories
                });
            }).catch(err => {
                this.setState({
                    loginstatus: false,
                    showResultLogin: true
                });
            });
        });
    }
    handleChange = (e) => {
        let ind = this.state.categories.findIndex(x=> x.uname === e.currentTarget.dataset.id);
        this.setState({ value: e.currentTarget.dataset.id });
        this.props.choose(this.state.categories[ind]);
    }

    render() {
        return <div className="row" style={{ justifyContent: "center" }}>
            {
                this.state.categories.map((category, i) => {
                    return <a href="#break"  className="main-category col-6 col-md-2 border" key={i} onClick={this.handleChange.bind(this)} data-id={category.uname}>
                        
                            <img src={"img/categories-img/" + category.icon} width="60px" />
                        <p>{category.name}</p></a>
                })
                
            }
            
        </div>
    }
}



