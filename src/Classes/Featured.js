import React, {Component} from 'react';

export class Featured extends Component {

    render(){

        return <section className="dorne-features-restaurant-area bg-default">
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="section-heading text-center">
                        <h4>Featured Restaurants</h4>
                    </div>
                </div>
            </div>

            <div className="row">
            
        <SingleFeature  rate="9.8" img="img/core-img/map.png" title="Pizzeria venezia" name="Hong Kong" />
        <SingleFeature  rate="9.8" img="img/core-img/map.png" title="Pizzeria venezia" name="Hong Kong" />
        <SingleFeature  rate="9.8" img="img/core-img/map.png" title="Pizzeria venezia" name="Hong Kong" />
        <SingleFeature  rate="9.8" img="img/core-img/map.png" title="Pizzeria venezia" name="Hong Kong" />

               
            </div>
        </div>
    </section>
    }

    
}
 export   const SingleFeature = (props) => {
        return  <div className="col-md-3">
        <div className="features-slides">
</div><div className="single-features-area">
        <img src="img/bg-img/feature-10.jpg" alt="" style={{width: "100%",
    height: "35vh",objectFit: "cover"}}/>
        {/* <!-- Rating & Map Area --> */}
        <div className="ratings-map-area d-flex">
            <a href="#">{props.rate}</a>
            <a href="#"><img src={props.img} alt=""/></a>
        </div>
        <div className="feature-content d-flex align-items-center justify-content-between">
            <div className="feature-title">
                <h5>{props.title}</h5>
                <p>{props.name}</p>
            </div>
            <div className="feature-favourite">
                <a href="#"><i className="far fa-heart" aria-hidden="true"></i></a>
            </div>
        </div>
    </div>
    </div>
    }