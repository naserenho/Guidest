import React, {Component} from 'react';


export class Search  extends Component{

    state={
        value: 0
    }
    handleChange=(e)=>{
    this.setState({value:e.target.value});
    }
    render(){
    return  <form action="#" method="get" id="searchFrom" className="hide">
    <select value={this.state.value}  onChange={this.handleChange} className="custom-select">
        <option value="0">Your Destinations</option>
        <option value="1">New York</option>
        <option value="2">Latvia</option>
        <option value="3">Dhaka</option>
        <option value="4">Melbourne</option>
        <option value="5">London</option>
    </select>
    <Catagories/>
   
    <button type="submit" className="btn dorne-btn"><i className="fa fa-search pr-2" aria-hidden="true"></i> Search</button>
</form>
    }
}

export class Catagories  extends Component{

    state={
        value: 0
    }
    handleChange=(e)=>{
    this.setState({value:e.target.value});
    }
    render(){
    return <select value={this.state.value}  onChange={this.handleChange} className="custom-select">
        <option value="0">All Catagories</option>
        <option value="1">Catagories 1</option>
        <option value="2">Catagories 2</option>
        <option value="3">Catagories 3</option>
    </select> 
   
    }
}
