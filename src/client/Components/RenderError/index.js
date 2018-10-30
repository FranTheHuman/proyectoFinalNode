'use strict'

import React, { Component, Fragment } from 'react'; 

class RenderError extends Component {
    constructor(props){
        super(props);
    }

    renderError = () => {
        if(!this.props.errC.success){
            if(this.props.errC.message != "No comentarios found."){
                return(
                    <div className="alert alert-danger mt-5 text-center" role="alert">
                        {this.props.errC.message}
                    </div>
                )  
            }
        } 
        if(!this.props.errU.success){ 
            return(
                <div className="alert alert-danger mt-5 text-center" role="alert">
                    {this.props.errU.message}
                </div>
            )   
        } 
        if(!this.props.errL.success){ 
            return(
                <div className="alert alert-danger mt-5 text-center" role="alert">
                    {this.props.errL.message}
                </div>
            )   
        } 
    }  

    render() {
        return(
            <Fragment>
                {this.renderError()}
            </Fragment>
        )};
};
 

export default RenderError;
 