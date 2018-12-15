import React, { Component } from 'react';

export class Listing extends Component {
  state ={
      category: this.props.match.params.category,
      places: []
  }
  componentDidMount(){
    fetch('https://guidest.herokuapp.com/places/get',{
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
     result : {}
    }

    componentDidMount(){
        fetch(`https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyBB3rwynTACfkRD28Ld2TE7sTdsHIv8qJY&placeid=${this.props.obj.placeID}&fields=address_component,rating,adr_address,alt_id,formatted_address,geometry,icon,id,name,permanently_closed,photo,place_id,plus_code,scope,type,url,utc_offset,vicinity`,{
            method: 'get',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
            }).then((res) => {
                res.json().then(r => {
                    this.setState({
                        result:r.result
                    });
                   
                }).catch(err =>{
        
                });
            });
        
    }
 render(){
     return  <div className="col-12 col-sm-6 col-lg-4">
     <div className="single-features-area mb-50">
         <img src="/img/bg-img/feature-1.jpg" alt=""/>
          
         <div className="price-start">
            {/* this.state.result.photos[0].html_attributions[0] */}
             <p>{this.state.result.rating}</p>
         </div>
         <div className="feature-content d-flex align-items-center justify-content-between">
             <div className="feature-title">
                 <h5>{this.props.obj.name}</h5>
                 <p>{this.props.obj.city}</p>
                 <p>{this.props.obj.tags}</p>

                 
             </div>
             <div className="feature-favourite">
                 <a href="#"><i className="far fa-heart" aria-hidden="true"></i></a>
             </div>
         </div>
     </div>
 </div>
 }

}