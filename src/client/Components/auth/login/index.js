'use strict'

import React, { Component } from 'react'; 
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom'
import validator from '../../../libs/Validators/index';
import * as actions from '../../../Actions/users';

import RenderError from '../../RenderError/index';
import Form from './form/index';

class Login extends Component {

    handleChange = (e) => { 
        const  { value, name }  = e.target;   
        var NewLogin = this.props.user.UserLogin; 
        NewLogin[name] = value; 
        this.props.saveNewLogin(NewLogin);  
    };

    verificacion = () => {
        if(!validator.VerificarEmail(this.props.user.UserLogin.email)){
            this.props.ErrorDispatch('Formato de Email incorrecto');
        } else if (!validator.verificarContraseña(this.props.user.UserLogin.password)) {
            this.props.ErrorDispatch('Formato de Contraseña incorrecto');
        } else {
            this.props.deErrorDispatch();
            this.props.fetchlOGIN(this.props.user.UserLogin)
        }
    }

    renderRedirect = () => {
        const token = localStorage.getItem('jwtToken');
        if(token && this.props.user.isAuthenticated && this.props.user.userDetails != undefined){
            if(this.props.user.userDetails.user.admin == true){
                return <Redirect to='/HomeAdmin' />
            } else if(this.props.user.userDetails.user.admin == false) {
                return <Redirect to='/' />
            }
            
        }  
    }   

    render(){
        return(
            <div className="container"> 
                {this.renderRedirect()} 
                <div className="row mt-1">
                    <div className="col-sm-6 mx-auto">
                        <div className="col-sm-6 mx-auto">
                            <h1 className="text-center">
                                <span className="fas fa-book-open mt-5"> 
                                </span> LibreLibros
                            </h1>      
                        </div>
                        <RenderError
                            errC={this.props.err2}
                            errU={this.props.user.err}
                            errL={this.props.err1}
                        />
                        <Form
                            handleChange={this.handleChange}
                            UserLogin={this.props.user.UserLogin}
                            verificacion={this.verificacion}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
     

const mapStateToProps = state => {
    return {
        user: state.users,
        err1: state.libros.err,
        err2: state.comentarios.err
    }
};

const mapDispatchToProps = dispatch => {
    return { 
        fetchlOGIN(user) {
            dispatch(actions.fetchlOGIN(user));
        },
        saveNewLogin(user) {
            dispatch(actions.saveNewLogin(user));
        },
        ErrorDispatch(error) {
            dispatch(actions.ErrorDispatch(error));
        },
        deErrorDispatch() {
            dispatch(actions.deErrorDispatch());
        }

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
    
