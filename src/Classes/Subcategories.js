import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Subcategories extends Component {

    state = {
        value: 0,
        subcats: []
    }
    componentDidMount() {
        if (this.props.value) {
            fetch('https://guidestae.herokuapp.com/subcats/get/' + this.props.value, {
                method: 'get',
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }).then((res) => {
                res.json().then(r => {
                    this.setState({
                        subcats: r.Subcategories,
                        value: r.Subcategories[0].uname
                    });
                    this.props.choose(this.state.value);
                }).catch(err => {
                    this.setState({
                        loginstatus: false,
                        showResultLogin: true
                    });
                });
            });
        }
    }

    handleChange = (e) => {
        this.setState({ value: e.target.value });
        this.props.choose(e.target.value);
    }
    render() {
        return <select value={this.state.value} onChange={this.handleChange} className="custom-select">
            {
                this.state.subcats.map((subcat, i) => {
                    return <option key={i} value={subcat.uname}>{subcat.name}</option>
                })
            }
        </select>

    }
}
