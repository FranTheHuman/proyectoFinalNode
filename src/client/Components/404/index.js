'use strict'

import React, { Component } from 'react'; 
import { Link } from 'react-router-dom' 

class NotFound extends Component {
     
    render(){
        return(  
            <div className="mt-5 text-center">
                <div className="alert alert-danger" role="alert">
                    <h4 className="alert-heading">404</h4>
                    <p>WE ARE SORRY, THE PAGE YOU REQUESTED NOT FOUND</p>
                    <hr/> 
                    <Link  className="btn btn-dark"  to={'/Home'}>Home</Link>
                </div>
            </div> 
        )
    }
}
  
export default NotFound;