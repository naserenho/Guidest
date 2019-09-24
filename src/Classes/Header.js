import React, { Component } from 'react';
import { Search } from './Search';

import { Link } from 'react-router-dom';

export class Header extends Component {

    render() {
        return <header className="header_area" id="header">
            <div className="container-fluid h-100">
                <div className="row h-100">
                    <div className="col-12 h-100">
                        <nav className="h-100 navbar navbar-expand-lg">
                            <Link to={`/`}><div className="navbar-brand"> <img src="img/logo-img/guidest-logo.svg" width={'170px'} alt="" />
                            </div></Link>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#dorneNav" aria-controls="dorneNav" aria-expanded="false" aria-label="Toggle navigation"><span className="fa fa-bars"></span></button>

                            <div className="collapse navbar-collapse" id="dorneNav">
                                <ul className="navbar-nav mr-auto" id="dorneMenu">

                                </ul>
                                {/* <Search/> */}
                                <div className="dorne-add-listings-btn mx-2"  >
                                    {this.props.userInfo && this.props.userInfo.token ?
                                        <Info logout={this.props.logout} userInfo={this.props.userInfo} /> :
                                        <Link style={{ color: "white" }} to={`/login`}>
                                            <div className="btn dorne-btn">
                                                Sign in  or Register
                                </div>
                                        </Link>
                                    }
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    }

}

export const Info = (props) => {
    return <div>

        <div className="dropdown show">
            <a className="btn dorne-btn dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Welcome, {props.userInfo.name} { props.userInfo.role == "Admin" ?
                 " (Admin)" : (props.userInfo.role == "SuperAdmin" ? " (SuperAdmin)" : "")}
            </a>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                {props.userInfo.role == "Admin" || props.userInfo.role == "SuperAdmin" ? <Link to={`/Items/Manage`}>
                <div className="dropdown-item" href="#"> Add/Edit Item </div>
                </Link> : "" }
                <a className="dropdown-item" href="#" onClick={props.logout}> Log Out </a>
            </div>
        </div>
    </div>
}