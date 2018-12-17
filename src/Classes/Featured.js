import React, {Component} from 'react';

export class Featured extends Component {
    state ={
        places: []
    }
    componentDidMount(){
        fetch(`https://guidest.herokuapp.com/places/Cat/${this.props.cat}`,{
        method: 'get',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*'

        })
        }).then((res) => {
            res.json().then(r => {
                this.setState({
                    places:r.places.slice(0,4)
                });
            }).catch(err =>{
    
            });
        });
    }
    render(){

        return <section className="dorne-features-restaurant-area bg-default">
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="section-heading text-center">
                        <h4>Featured {this.props.cat}</h4>
                    </div>
                </div>
            </div>

            <div className="row">
            {this.state.places.map((place)=>{
                return  <SingleFeature  rate="9.8" title={place.name} name={place.city} />
            })}
       
               
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
            <a href="#"><img src="" alt="" height="27px"/></a>
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