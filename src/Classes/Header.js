import React, {Component} from 'react';
import { Search} from './Search';

import {Link } from 'react-router-dom';

export class Header extends Component{

    render(){
        return <header className="header_area" id="header">
        <div className="container-fluid h-100">
            <div className="row h-100">
                <div className="col-12 h-100">
                    <nav className="h-100 navbar navbar-expand-lg">
                        <a className="navbar-brand" href="index.html"><img src="img/bg-img/logo.png" width={'200px'} alt=""/></a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#dorneNav" aria-controls="dorneNav" aria-expanded="false" aria-label="Toggle navigation"><span className="fa fa-bars"></span></button>
                        
                        <div className="collapse navbar-collapse" id="dorneNav">
                            <ul className="navbar-nav mr-auto" id="dorneMenu">
                        
                            </ul>
                            <Search/>
                            {/* <!-- Signin btn --> */}
                            <div className="dorne-signin-btn">
                                <a href="#">+ Add Listings </a>
                            </div>
                            
                            <div className="dorne-add-listings-btn"  >
                                <a href="#" className="btn dorne-btn" >
                                <Link to={`/login`}>Sign in  or Register</Link>
                                </a>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    </header>
    }
    
}

// export class Search  extends Component{

//     state={
//         value: 0
//     }
//     handleChange=(e)=>{
//     this.setState({value:e.target.value});
//     }
//     render(){
//     return  <form action="#" method="get">
//     <select value={this.state.value}  onChange={this.handleChange} className="custom-select">
//         <option value="0">Your Destinations</option>
//         <option value="1">New York</option>
//         <option value="2">Latvia</option>
//         <option value="3">Dhaka</option>
//         <option value="4">Melbourne</option>
//         <option value="5">London</option>
//     </select>

   
//     <button type="submit" className="btn dorne-btn"><i className="fa fa-search pr-2" aria-hidden="true"></i> Search</button>
// </form>
//     }
// }
