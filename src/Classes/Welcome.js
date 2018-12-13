import React, {Component} from 'react';
import { Search} from './Search';


export class Welcome extends Component {
   
    render(){
        return <section className="dorne-welcome-area bg-img bg-overlay" style={{backgroundImage: "url(img/bg-img/hero-1.jpg)"}}>
        <div className="container h-100">
            <div className="row h-100 align-items-center justify-content-center">
                <div className="col-12 col-md-8">
                    <div className="hero-content">
                        <h2>Discover places near you</h2>
                        <h4>This is the best guide of your city</h4>
                    </div>
                   
                    <div className="hero-search-form">
                        <div className="tab-content" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="nav-places" role="tabpanel" aria-labelledby="nav-places-tab">
                                <h6>What are you looking for?</h6>
                              <Search/>
                            </div>
                    
                        </div>
                    </div>
                </div>
            </div>
        </div>
   
    </section>
}}