'use strict'

import React, {Component, Fragment, Suspense, lazy} from 'react';
import {Redirect} from 'react-router-dom';

import {connect} from 'react-redux';
import {loadAllComentarios} from '../../../Actions/comentarios';
import {loadNombresUsers} from '../../../Actions/users';



import Navegacion from '../navegacion/index';
import RenderError from '../../RenderError/index'; 

class Inicio extends Component {
          
    componentDidMount(){
        this.props.loadAllComentarios();
        this.props.loadNombresUsers();
    } 

    redirect = () => {  
        // guardamos el token q deberia encontrarse alli
        const token = localStorage.getItem('jwtToken'); 
        if(
            !token || // si el token es false (no esta definido o no posee nada)
            //props.users.userDetails == undefined || // o los datos del usuario no estan definidos
            this.props.users.userDetails.user.admin == false || // o los datos del usuario autenticado no es de un administrador
            this.props.users.err.message == "authentication failed." || // o los errores del state poseen este mensaje
            this.props.comentarios.err.message == "authentication failed."  
        ){
            // removemos el posible token q se encuentre en loclastorage
            localStorage.removeItem('jwtToken');
            // Redireccionamos al login
            return <Redirect to='/Login'/>
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
                      Inicio Admin <i className="fas fa-home"></i>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">LibreLibros</h5>
                      <p className="card-text">Este es un inicio para el admin, la verdad no se me ocurrio algo para poner y no tengo las suficientes ganas de centrarme tanto en el diseño.</p>
                      <a href="#" className="btn btn-dark ">Go somewhere</a>
                    </div> 
                </div>
                <div className="card text-center mt-5">
                    <div className="card-header">
                      <h4><strong>Ultimos 20 Comentarios</strong></h4>
                    </div>
                    <div className="card-body"> 
                        <RenderError
                            errC={this.props.comentarios.err}
                            errU={this.props.users.err}
                            errL={{success: true}}
                        /> 
                        {
                            this.props.comentarios.comentarios.map(comentario => {
                                return(
                                    <div key={comentario.id} className="card text-center mt-1"> 
                                        {
                                            this.props.users.users.map(user => {
                                                if(user.id == comentario.UsuarioId){
                                                    return(
                                                        <div key={user.id} className="card-header">
                                                            <h5>{user.nombre}</h5>
                                                        </div>
                                                    )
                                                }
                                            })
                                        }
                                        <div className="card-body">
                                            <p>{comentario.texto}</p>
                                            <p>Libro: {comentario.LibroId}</p>
                                        </div>
                                        <div className="card-footer text-muted">
                                            <p>{`${new Date(comentario.createdAt).getMonth()+1}/${new Date(comentario.createdAt).getDate()}/${new Date(comentario.createdAt).getFullYear()}-${new Date(comentario.createdAt).getHours()}hs`}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                       
                    </div>
                </div>
            </div>
       </Fragment>  
    )}
};

const mapStateToProps = state => {
    return {
        users: state.users,
        comentarios: state.comentarios
    }
};
const mapDispatchToProps = dispatch => {
    return { 
        loadAllComentarios() {
            dispatch(loadAllComentarios());
        },
        loadNombresUsers() {
            dispatch(loadNombresUsers());
        } 
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Inicio); 