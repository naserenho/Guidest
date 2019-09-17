import React, {Component} from 'react';
import {Link } from 'react-router-dom';


export class Search  extends Component{

    state={
        value: 0,
        category: ""
    }
    handleChange=(e)=>{
    this.setState({value:e.target.value});
    }
    handleCategory=(e)=>{
        this.setState({category:e});
        }
    render(){
    return  <form action="#" method="get" id="searchFrom" className="hide">
    <select value={this.state.value}  onChange={this.handleChange} className="custom-select">
        <option value="0">Your Destinations</option>
        <option value="AbuDhabi">AbuDhabi</option>
        <option value="Dubai">Dubai</option>
        <option value="Sharjah">Sharjah</option>
    </select>
    <Categories value={this.state.value} choose={this.handleCategory} />
   
    <Link to={`/listing/${this.state.category}`}>
<button type="submit" className="btn dorne-btn"><i className="fa fa-search pr-2" aria-hidden="true"></i> Search</button></Link>
</form>
    }
}

export class Categories  extends Component{

    state={
        value: 0,
        categories: []
    }
    componentDidMount(){
        fetch('https://guidestae.herokuapp.com/categories/get',{
        method: 'get',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
        }).then((res) => {
            res.json().then(r => {
                this.setState({
                    categories: r.Categories,
                    value:r.Categories[0].name
                });
                this.props.choose(this.state.value);
            }).catch(err =>{
                this.setState({
                    loginstatus: false,
                    showResultLogin: true
                });
            });
        });
    }
    handleChange=(e)=>{
    this.setState({value:e.target.value});
    this.props.choose(e.target.value);

    }
    render(){
    return <select value={this.state.value}  onChange={this.handleChange} className="custom-select">
       {
           this.state.categories.map((category , i)=>{
               return <option key={i} value={category.name}>{category.name}</option>
           })
       }
      
    </select> 
   
    }
}
