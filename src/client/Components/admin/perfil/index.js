'use strict'

import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import * as actionsC from '../../../Actions/comentarios';
import {loadUsers} from '../../../Actions/users';
import {loadLibros} from '../../../Actions/libros';
import {Redirect} from 'react-router-dom'

import Navegacion from '../navegacion/index'; 
import Edit from './edit/index';
import Comentario from './comentarios/index'; 
import RenderError from '../../RenderError/index';

class Perfil extends Component {
  
    componentDidMount(){
        this.props.loadUsers();
        this.props.loadLibros();
        this.props.loadComentarios(this.props.match.params.id);
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

    handleChange = (e) => { 
        const  { value }  = e.target;   
        this.props.comentarios.newComentario.texto = value;   
    };

    render() {
        return(
            <Fragment>
                {this.redirect()}
                <Navegacion/>
                <div className="container mt-5"> 
                <RenderError
                    errC={this.props.comentarios.err}
                    errU={this.props.users.err}
                    errL={this.props.libros.err}
                />
                <Edit
                    comentarios={this.props.comentarios}
                    handleChange={this.handleChange}
                />
                    <div className="card text-center mt-5">
                        <div className="card-header" id="perfil3">
                          Perfil
                        </div>
                        {
                            this.props.users.users.map(user => {
                                if(user.id == this.props.match.params.id){
                                    return(
                                        <div key={user.id} className="card-body" id="perfil">
                                            <h5 className="card-title">{user.nombre}</h5>
                                            <p className="card-text">{user.email}</p> 
                                        </div>
                                    )    
                                }
                            })
                        }
                        <Comentario
                            comentarios={this.props.comentarios.comentarios}
                            id={this.props.match.params.id}
                            libros={this.props.libros.libros}
                            deleteComentario={this.props.deleteComentario}
                            setStateEdit={this.props.setStateEdit}
                        />
                   </div>
                </div>
            </Fragment>
        )};
};
 
const mapStateToProps = state => {
    return {
        comentarios: state.comentarios,
        libros: state.libros,
        users: state.users
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadUsers() {
            dispatch(loadUsers());
        },
        loadComentarios(user) {
            dispatch(actionsC.loadComentarios(user));
        },
        editComentario(comentario) {
            dispatch(actionsC.editComentario(comentario));
        },
        deleteComentario(id, user) {
            dispatch(actionsC.deleteComentario(id, user));
        },
        setStateEdit(id) {
            dispatch(actionsC.setStateEdit(id));
        },
        loadLibros() {
            dispatch(loadLibros());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Perfil);
 