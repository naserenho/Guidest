import React, { Component } from 'react';

export class Listing extends Component {
  state ={
      category: this.props.match.params.category,
      places: []
  }
  componentDidMount(){
    fetch(`https://guidest.herokuapp.com/places/Cat/${this.state.category}`,{
    method: 'get',
    headers: new Headers({
        'Content-Type': 'application/json'
    })
    }).then((res) => {
        res.json().then(r => {
            this.setState({
                places:r.places
            });
        }).catch(err =>{

        });
    });
}
  render(){
      return <section className="dorne-listing-destinations-area section-padding-100-50">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="section-heading dark text-center">
                        <span></span>
                        <h4>Featured {this.state.category}</h4>
                        <p>Editor’s pick</p>
                    </div>
                </div>
            </div>
            <div className="row">
            {
                this.state.places.map((place)=>{
                    return <ListItem obj={place} />
                })
            }
               {/* <ListItem />
               <ListItem/>

               <ListItem/>

               <ListItem/>

               <ListItem/>

               <ListItem/>

               <ListItem/>
               <ListItem/>

               <ListItem/> */}

                
            </div>
        </div>
    </section>
}}

class ListItem extends Component{
 state = {
     result : {},
     photo:""
    }

    componentDidMount(){
        fetch(`https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyBB3rwynTACfkRD28Ld2TE7sTdsHIv8qJY&placeid=${this.props.obj.placeID}&fields=address_component,rating,adr_address,alt_id,formatted_address,geometry,icon,id,name,permanently_closed,photo,place_id,plus_code,scope,type,url,utc_offset,vicinity`,{
            method: 'get',
            credentials: "same-origin",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*'
            })
            }).then((res) => {
                res.json().then(r => {
                    this.setState({
                        result:r.result,
                        photo: `https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyBB3rwynTACfkRD28Ld2TE7sTdsHIv8qJY&photoreference=${r.result.photos[0].photo_reference}&maxheight=500`
                    });
                
                }).catch(err =>{
        
                });
            });
        
    }
 render(){
     return  <div className="col-12 col-sm-6 col-lg-4">
     <div className="single-features-area mb-50">
         <img src={this.state.photo} alt=""/>
          
         <div className="price-start">
            {/* this.state.result.photos[0].html_attributions[0] */}
             <p><i className="fa fa-star"></i>  {this.state.result.rating}</p>
         </div>
         
         <div className="feature-content d-flex align-items-center justify-content-between">
             <div className="feature-title">
                 <h5>{this.state.result.name}</h5>
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