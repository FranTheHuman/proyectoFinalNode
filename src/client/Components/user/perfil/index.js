'use strict'

import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import * as actionsC from '../../../Actions/comentarios'; 
import {buscarLibroId, loadLibros} from '../../../Actions/libros';
import { Redirect } from 'react-router-dom'

// Componentes
import Navegacion from '../navegacion/index';
import Comentarios from './comentarios/index';
import RenderError from '../../RenderError/index';
import Edit from './edit/index';

class PerfilU extends Component {

    redirect = () => {  
        // guardamos el token q deberia encontrarse alli
        const token = localStorage.getItem('jwtToken'); 
        if(
            !token || // si el token es false (no esta definido o no posee nada)
            this.props.users.userDetails == undefined || // o los datos del usuario no estan definidos
            this.props.users.err.message == "authentication failed." || // o los errores del state poseen este mensaje
            this.props.comentarios.err.message == "authentication failed." ||
            this.props.libros.err.message == "authentication failed." 
        ){
            // removemos el posible token q se encuentre en loclastorage
            localStorage.removeItem('jwtToken');
            // Redireccionamos al login
            return <Redirect to='/Login'/>
        } 
    }

    componentDidMount(){   
        this.props.loadComentarios(this.props.match.params.id); 
        if(this.props.comentarios.comentarios[0] != undefined){
            if(!isNaN(this.props.comentarios.comentarios[0].LibroId)){
                this.props.buscarLibroId(this.props.comentarios.comentarios[0].LibroId);
            } else if(!isNaN(this.props.comentarios.comentarios.LibroId)){
                this.props.buscarLibroId(this.props.comentarios.comentarios[0].LibroId);
            }
        } else {
            this.props.loadLibros(); 
        }
        
    }

    handleChange = (e) => { 
        const  { value }  = e.target;   
        this.props.comentarios.editComentario.texto = value;   
        this.props.comentarios.editComentario.UserId = this.props.users.userDetails.user.id;
    };

    render() {
        return(
            <Fragment>
                {this.redirect()}
                <Navegacion/>  
                <div className="container mt-5"> 
                    <RenderError
                        errC={this.props.comentarios.err}
                        errU={{success: true}}
                        errL={{success: true}}
                    />
                    <Edit
                        handleChange={this.handleChange}
                        edit={this.props.comentarios.edit}
                        editComentario={this.props.comentarios.editComentario}
                        EditComentario={this.props.EditComentario}
                    />
                    <div className="card text-center mt-5">
                        <div className="card-header" id="perfil3">
                          Perfil
                        </div> 
                        <div className="card-body" id="perfil">
                            <h5 className="card-title">{this.props.users.userDetails.user.nombre}</h5>
                            <p className="card-text">{this.props.users.userDetails.user.email}</p> 
                        </div> 
                        <Comentarios
                            comentarios={this.props.comentarios.comentarios}
                            libros={this.props.libros.libros}
                            id={this.props.match.params.id}
                            deleteComentario={this.props.deleteComentario}
                            setStateEdit={this.props.setStateEdit} 
                            err={this.props.comentarios.err}
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
        loadComentarios(user) {
            dispatch(actionsC.loadComentarios(user));
        },
        EditComentario(comentario) {
            dispatch(actionsC.editComentario(comentario));
        },
        deleteComentario(id, user) {
            dispatch(actionsC.deleteComentario(id, user));
        },
        setStateEdit(id) {
            dispatch(actionsC.setStateEdit(id));
        },
        buscarLibroId(id) {
            dispatch(buscarLibroId(id));
        },
        loadLibros(){
            dispatch(loadLibros());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PerfilU);
 