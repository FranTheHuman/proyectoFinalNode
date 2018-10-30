'use strict'

import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom'
import validator from '../../../libs/Validators/index';
import * as actions from '../../../Actions/libros';
import * as actionsC from '../../../Actions/comentarios'; 
import * as actionsU from '../../../Actions/users'; 

// Componentes
import Navegacion from '../navegacion/index';
import Modal from './modal/index';
import Tabla from './tabla/index';
import Paginacion from './paginacion/index';
import Search from './search/index';

class Libros extends Component {

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

    renderError = () => {
        if(!this.props.libros.err.success){
            return(
                <div className="alert alert-danger mt-5 text-center" role="alert">
                    {this.props.libros.err.message}
                </div>
            )
        }
    }
 
    renderErrorComentario = () => {
        if(!this.props.comentarios.err.success){
            return(
                <div className="alert alert-danger mt-2 text-center" role="alert">
                    {this.props.comentarios.err.message}
                </div>
            )
        }
    }

    handleChange = (e) => {
        const { value } = e.target; 
        const usuario = this.props.users.userDetails.user.id;
        this.props.setNewComentario(value, usuario);
    }

    EnviarComentario = () => {
        const comentario = this.props.comentarios.nuevoComentario;
        if(!validator.verificarTexto(comentario.texto)){
            this.props.ErrorDispatch('El formato del comentario no es valido');
        } else {
            this.props.deErrorDispatch();
            this.props.Comentar(comentario);
        }
        
    }

    componentDidMount(){
        this.props.loadLibros(this.props.match.params.page);
    }

    handleChangeBuscar = (e) => { 
        const  { value }  = e.target; 
        var par = value;
        this.props.saveParametro(par);   
    }; 
 
    render() {
    return(
        <Fragment>      
            {this.redirect()}
            <Navegacion/>  
            {this.renderError()} 
            <Search
                BuscarLibro={this.props.BuscarLibro}
                handleChangeBuscar={this.handleChangeBuscar}
                parametro={this.props.libros.parametro}
            />
            <Modal 
                comentarios={this.props.comentarios.comentarios} 
                users={this.props.users.users} 
                handleChange={this.handleChange} 
                nuevoComentario={this.props.comentarios.nuevoComentario}
                EnviarComentario={this.EnviarComentario}
                Error={this.renderErrorComentario}
            />
            <Tabla
                libros={this.props.libros.libros}
                loadNombresUsers={this.props.loadNombresUsers}
                loadComentariosL={this.props.loadComentariosL}
            />
            <Paginacion
                pages={this.props.libros.pages}
                current={this.props.libros.current}
            /> 
        </Fragment>
    )};
};

const mapStateToProps = state => {
    return {
        libros: state.libros,
        comentarios: state.comentarios,
        users: state.users
    }
};

const mapDispatchToProps = dispatch => {
    return {  
        BuscarLibro(parametro) {
            dispatch(actions.buscarLibro(parametro));
        },
        saveNewLibro(libro) {
            dispatch(actions.saveNewLibro(libro));
        }, 
        loadLibros(page) {
            dispatch(actions.loadLibrosPagination(page));
        },
        saveParametro(parametro) {
            dispatch(actions.saveParametro(parametro));
        },
        ErrorDispatch(error) {
            dispatch(actions.ErrorDispatch(error));
        },
        deErrorDispatch() {
            dispatch(actions.deErrorDispatch());
        },
        loadComentariosL(libro) {
            dispatch(actionsC.loadComentariosL(libro));
        },
        loadNombresUsers(){
            dispatch(actionsU.loadNombresUsers());
        },
        setNewComentario(a, b){
            dispatch(actionsC.setNewComentario(a, b));
        },
        Comentar(comentario){
            dispatch(actionsC.Comentar(comentario));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Libros);



