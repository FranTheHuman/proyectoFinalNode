'use strict'

import React, { Component } from 'react'; 
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom'
import validator from '../../../libs/Validators/index';
import * as actions from '../../../Actions/users';

import FormSignUp from './form/index';
import RenderError from '../../RenderError/index';

class SignUp extends Component {

    handleChange = (e) => { 
        const  { value, name }  = e.target;   
        var NewLogin = this.props.user.UserLogin; 
        NewLogin[name] = value; 
        this.props.saveNewLogin(NewLogin);  
    };

    renderRedirect = () => {
        const token = localStorage.getItem('jwtToken');
        if(token && this.props.user.isAuthenticated){
            return <Redirect to='/' />
        }  
    }

    verificacion = () => {
        if(!validator.VerificarEmail(this.props.user.UserLogin.email)){
            this.props.ErrorDispatch('Formato de Email incorrecto');
        } else if (!validator.verificarContraseña(this.props.user.UserLogin.password) || !validator.verificarContraseña(this.props.user.UserLogin.passwordOwO)) {
            this.props.ErrorDispatch('Formato de Contraseña incorrecto');
        } else if (!validator.verificarNombre(this.props.user.UserLogin.nombre)) {
            this.props.ErrorDispatch('Formato de Nombre incorrecto');
        } else {
            this.props.deErrorDispatch();
            this.props.fetchSIGNUP(this.props.user.UserLogin);
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
                        errC={{success: true}}
                        errU={this.props.user.err}
                        errL={{success: true}}
                    />
                    <FormSignUp
                        handleChange={this.handleChange}
                        UserLogin={this.props.user.UserLogin}
                        verificacion={this.verificacion}
                    />
                </div>
            </div>
        </div>
    )};
}

const mapStateToProps = state => {
    return {
        user: state.users
    }
};

const mapDispatchToProps = dispatch => {
    return { 
        fetchSIGNUP(user) {
            dispatch(actions.fetchSIGNUP(user));
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

    
