import React, {Component} from 'react';
import {Link } from 'react-router-dom';


export class Search  extends Component{

    state={
        value: 0,
        category: "",
        subcategory: ""
    }
    handleChange=(e)=>{
    this.setState({value:e.target.value});
    }
    handleCategory=(e)=>{
        this.setState({category:e});
        }
    handleSubcategory=(e)=>{
        this.setState({subcategory:e});
        }
    render(){
    return  <form action="#" method="get" id="searchFrom" className="hide">
    <select value={this.state.value}  onChange={this.handleChange} className="custom-select">
        <option value="0">Your Destinations</option>
        <option value="AbuDhabi">Abu Dhabi</option>
        <option value="AlAin">Al Ain</option>
        <option value="Dubai">Dubai</option>
        <option value="Sharjah">Sharjah</option>
        <option value="Ajman">Ajman</option>
        <option value="UAQ">Umm Al Qiween</option>
        <option value="RAK">Ras Al Khaimah</option>
        <option value="FUJ">Al Fujairah</option>
    </select>
    <Categories value={this.state.value} choose={this.handleCategory} subchoose={this.handleSubcategory} />

    <Link to={`/listing/${this.state.category}`}>
<button type="submit" className="btn dorne-btn"><i className="fa fa-search pr-2" aria-hidden="true"></i> Search</button></Link>
</form>
    }
}

export class Categories  extends Component{

    state={
        value: 0,
        subvalue: 0,
        categories: [],
        subcats: []
    }
    componentDidMount(){
        fetch('https://guidestae.herokuapp.com/cats/get',{
        method: 'get',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
        }).then((res) => {
            res.json().then(r => {
                this.setState({
                    categories: r.Categories,
                    value:r.Categories[0].uname
                });
                this.props.choose(this.state.value);
                this.fillSubs(r.Categories[0].uname);
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
        this.fillSubs(e.target.value);
    }
    handleSubChange=(e)=>{
        this.setState({subvalue:e.target.value});
        this.props.subchoose(e.target.value);
    }
    fillSubs=(e)=>{    
        fetch('https://guidestae.herokuapp.com/subcats/get/' + e,{
                method: 'get',
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
                }).then((res) => {
                    res.json().then(r => {
                        this.setState({
                            subcats: r.Subcategories,
                            subvalue:r.Subcategories[0].uname
                        });
                        this.props.subchoose(this.state.subvalue);
                    }).catch(err =>{
                        this.setState({
                            loginstatus: false,
                            showResultLogin: true
                        });
                    });
                });
        
    }
    render(){
    return <div><select value={this.state.value}  onChange={this.handleChange} className="custom-select">
       {
           this.state.categories.map((category , i)=>{
               return <option key={i} value={category.uname}>{category.name}</option>
           })
       }
      
    </select> 
    <select value={this.state.subvalue}  onChange={this.handleSubChange} className="custom-select">
       {
           this.state.subcats.map((subcat , i)=>{
               return <option key={i} value={subcat.uname}>{subcat.name}</option>
           })
       }
      
    </select>
    </div>
    }
}

export class Subcategories  extends Component{

    state={
        value: 0,
        subcats: []
    }
    componentDidMount(){
        console.log(this.props.value);
        if (this.props.value != "") {

            fetch('https://guidestae.herokuapp.com/subcats/get/' + this.props.value,{
            method: 'get',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
            }).then((res) => {
                res.json().then(r => {
                    this.setState({
                        subcats: r.Subcategories,
                        value:r.Subcategories[0].uname
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
    }

    handleChange=(e)=>{
    this.setState({value:e.target.value});
    this.props.choose(e.target.value);

    }
    render(){
    return <select value={this.state.value}  onChange={this.handleChange} className="custom-select">
       {
           this.state.subcats.map((subcat , i)=>{
               return <option key={i} value={subcat.uname}>{subcat.name}</option>
           })
       }
      
    </select> 
   
    }
}