import React, {Component} from 'react';

export class Footer extends Component {

    render(){
        return <footer className="dorne-footer-area">
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 d-md-flex align-items-center justify-content-between">
                    <div className="footer-text">
                        <p>
Copyright &copy;<script>document.write(new Date().getFullYear());</script> 
                        </p>
                    </div>
                    <div className="footer-social-btns">
                        <a href="#"><i className="fab fa-linkedin" aria-haspopup="true"></i></a>
                        <a href="#"><i className="fab fa-twitter" aria-haspopup="true"></i></a>
                        <a href="#"><i className="fab fa-facebook" aria-haspopup="true"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
}
}