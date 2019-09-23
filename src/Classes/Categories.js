import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Categories extends Component {

    state = {
        value: 0,
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
        this.setState({ value: e.currentTarget.dataset.id });
        this.props.choose(e.currentTarget.dataset.id);
    }

    render() {
        return <div className="row" style={{ justifyContent: "center" }}>
            {
                this.state.categories.map((category, i) => {
                    return <div className="col-6 col-md-3 border" key={i} onClick={this.handleChange.bind(this)} data-id={category.uname}>
                        <div>
                            <img src={"img/categories-img/" + category.icon} width="70px" />
                        </div><p>{category.name}</p></div>
                })
            }
        </div>
    }
}


