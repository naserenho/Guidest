import React, { Component } from 'react';

export class Featured extends Component {
    render() {
        return <section className="dorne-listing-destinations-area section-padding-100-50">
            <div className="container">
                <div className="row">
                    {
                        this.props.items.length > 0 ? this.props.items.map((item, ind) => {
                            return <ListItem key={ind} obj={item} />
                        }) : <div>No items yet in {this.props.subcat} and {this.props.city}</div>
                    }
                </div>
            </div>
        </section>
    }


}
export const SingleFeature = (props) => {
    return <div className="col-6 col-md-4">
        <div className="subcat-items">
            <img src="img/bg-img/feature-10.jpg" alt="" style={{
                width: "100%",
                height: "35vh", objectFit: "cover"
            }} />
            {/* <!-- Rating & Map Area --> */}
            <div className="ratings-map-area d-flex">
                <a href="#">{props.rate}</a>
                <a href="#"><img src="" alt="" height="27px" /></a>
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


class ListItem extends Component {
    state = {
        result: {},
        photo: ""
    }

    componentDidMount() {
        if (this.props.obj.placeID) {
            const proxyurl = "https://cors-anywhere.herokuapp.com/";
            const url = `https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyBB3rwynTACfkRD28Ld2TE7sTdsHIv8qJY&placeid=${this.props.obj.placeID}&fields=address_component,rating,adr_address,alt_id,formatted_address,geometry,icon,id,name,permanently_closed,photo,place_id,plus_code,scope,type,url,utc_offset,vicinity`;
            fetch(proxyurl + url, {
                method: 'get',

                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',


                })
            }).then((res) => {
                res.json().then(r => {
                    this.setState({
                        result: r.result,
                        photo: `https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyBB3rwynTACfkRD28Ld2TE7sTdsHIv8qJY&photoreference=${r.result.photos[0].photo_reference}&maxheight=500`
                    });
                }).catch(err => {
                    console.log("Inside google APIs error.");
                    console.log(err);
                });
            }).catch(err => {
                console.log("The google APIs are not working.");
                console.log(err);
            });
        }
    }

    render() {
        return <div className="col-6 col-md-4">
            <div className="subcat-items">
                <img src={this.state.photo} alt="" />

                <div className="price-start">
                    {/* this.state.result.photos[0].html_attributions[0] */}
                    <p><i className="fa fa-star"></i>  {this.state.result.rating}</p>
                </div>

                <div className="feature-content d-flex align-items-center justify-content-between">
                    <div className="feature-title">
                        <h5>{this.props.obj.name}</h5>
                        <p>{this.props.obj.city}</p>
                        <p>{this.props.obj.tags}</p>
                        {/* <p>{this.state.openingTimes}</p> */}



                        <a href={this.state.result.url}><i className="fas fa-map-pin"></i> {this.state.result.formatted_address}</a>


                    </div>
                    <div className="feature-favourite">
                        <a href="#"><i className="far fa-heart" aria-hidden="true"></i></a>
                    </div>
                </div>
            </div>
        </div>
    }

}