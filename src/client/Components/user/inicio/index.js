'use strict'

import React, {Component, Fragment} from 'react'; 
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'

//import RenderError from '../../RenderError/index';
import Navegacion from '../navegacion/index'; 

class InicioU extends Component{

    redirect = () => {  
        // guardamos el token q deberia encontrarse alli
        const token = localStorage.getItem('jwtToken'); 
        if(
            !token || // si el token es false (no esta definido o no posee nada)
            this.props.users.userDetails.user == undefined || // o los datos del usuario no estan definidos
            this.props.users.err.message == "authentication failed." // o los errores del state poseen este mensaje
        ){
            // removemos el posible token q se encuentre en loclastorage
            localStorage.removeItem('jwtToken');
            // Redireccionamos al login
            return <Redirect to='/Login'/>
        } 
        if(this.props.users.userDetails.user.admin == true) { 
            // Redireccionamos al login
            return <Redirect to='/HomeAdmin'/>
        }
    }

    render(){
        return(
            <Fragment> 
                {this.redirect()}
                <Navegacion/> 
                <div className="container"> 
                    <div className="card text-center mt-5">
                        <div className="card-header">
                          Bienvenido {
                              this.props.users.userDetails.user != undefined ?
                              this.props.users.userDetails.user.nombre
                              :
                              null
                          } <i className="fas fa-home"></i>
                        </div>
                        <div className="card-body">
                          <h5 className="card-title">LibreLibros</h5>
                          <p className="card-text">Este es un inicio para un usuario normal, la verdad no se me ocurrio algo para poner y no tengo las suficientes ganas de centrarme tanto en el diseño.</p>
                          <a href="#" className="btn btn-dark ">Go somewhere</a>
                        </div>
                        <div className="card-footer text-muted">
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
 

const mapStateToProps = state => {
    return {
        users: state.users
    }
};
 

export default connect(mapStateToProps)(InicioU); 