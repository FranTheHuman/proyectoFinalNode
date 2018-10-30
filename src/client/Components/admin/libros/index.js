'use strict'

import React, { Component, Fragment } from 'react';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import validator from '../../../libs/Validators/index';
import * as actions from '../../../Actions/libros';

// Componentes
import Navegacion from '../navegacion/index'; 
import Tabla from './tabla';
import Input from './input';
import RenderError from '../../RenderError/index'; 

class LibrosAdm extends Component {
  
    redirect = () => {  
        // guardamos el token q deberia encontrarse alli
        const token = localStorage.getItem('jwtToken'); 
        if(
            !token || // si el token es false (no esta definido o no posee nada)
            this.props.users.userDetails == undefined || // o los datos del usuario no estan definidos
            this.props.users.userDetails.user.admin == false || // o los datos del usuario autenticado no es de un administrador
            this.props.users.err.message == "authentication failed." || // o los errores del state poseen este mensaje
            this.props.libros.err.message == "authentication failed."  
        ){
            // removemos el posible token q se encuentre en loclastorage
            localStorage.removeItem('jwtToken');
            // Redireccionamos al login
            return <Redirect to='/Login'/>
        } 
    }

    fileSelecterHandler = event => {
        //console.log(event.target.files[0]);
        let NewLibro = this.props.libros.newLibro;
        NewLibro.libroImage = event.target.files[0]; 
        this.props.saveNewLibro(NewLibro); 
    }


    eliminar = (isbn, titulo) => {
        var r = confirm(`¿SEGURO QUE DESEA ELIMINAR EL LIBRO: ${titulo}?`);
        if (r) {
            this.props.EliminarLibro(isbn, this.props.libros.current)
        }   
    }

    verificacion = () => { 
        if(!validator.verificarTitulo(this.props.libros.newLibro.titulo)){
            this.props.ErrorDispatch('Formato de Titulo incorrecto');
        } else if (!validator.verificarIsbn(this.props.libros.newLibro.isbn)) {
            this.props.ErrorDispatch('Formato de ISBN incorrecto');
        } else if (!validator.verificarAutor(this.props.libros.newLibro.autor)) {
            this.props.ErrorDispatch('Formato de Autor incorrecto');
        } else if (!validator.verificarGenero(this.props.libros.newLibro.genero)) {
            this.props.ErrorDispatch('Formato de Genero incorrecto');
        } else {
            this.props.deErrorDispatch();
            this.props.NuevoLibro(this.props.libros.newLibro, this.props.libros.current);
        }
    } 

    handleChangeNuevoLibro = (e) => { 
        const  { name, value }  = e.target;  
        let NewLibro = this.props.libros.newLibro; 
        let contador = 0;
        if(!this.props.libros.edit){
            this.props.libros.libros.map(l => { contador++; }); 
            NewLibro.id =  contador+1;
        } 
        NewLibro[name] = value; 

        this.props.saveNewLibro(NewLibro); 
    };

    componentDidMount(){
        this.props.loadLibros(this.props.match.params.page);
    }

    handleChangeBuscar = (e) => { 
        const  { value }  = e.target; 
        var par = value;
        this.props.saveParametro(par); 
    };

    EDITARLibro = (libro) => { 
        this.props.setStateEdit();  
        let EditLibro = {}; 
        EditLibro.id =  libro.id;
        EditLibro.titulo =  libro.titulo;
        EditLibro.isbn =  libro.isbn;
        EditLibro.autor =  libro.autor; 
        EditLibro.genero =  libro.genero; 

        this.props.saveNewLibro(EditLibro);  
    }

    isLoading = () => {
        if(this.props.libros.loading == true){
            return (
                <div class="lds-hourglass"></div>
            )
        }
    }

    EDITARLibro2 = () => {
        if(!validator.verificarTitulo(this.props.libros.newLibro.titulo)){
            this.props.ErrorDispatch('Formato de Titulo incorrecto');
        } else if (!validator.verificarIsbn(this.props.libros.newLibro.isbn)) {
            this.props.ErrorDispatch('Formato de ISBN incorrecto');
        } else if (!validator.verificarAutor(this.props.libros.newLibro.autor)) {
            this.props.ErrorDispatch('Formato de Autor incorrecto');
        } else if (!validator.verificarGenero(this.props.libros.newLibro.genero)) {
            this.props.ErrorDispatch('Formato de Genero incorrecto');
        } else {
            this.props.deErrorDispatch();
            let EditLibro = this.props.libros.newLibro;   
            this.props.EditarLibro(EditLibro, this.props.libros.current);  
            this.props.setStateEdit();    
        }
    }
 
    render() {
    return(
       <Fragment>
        {this.redirect()}
        <Navegacion/> 
        <Tabla 
            libros={this.props.libros.libros}
            EditarLibro={this.EDITARLibro}
            EliminarLibro={this.eliminar} 
            BuscarLibro={this.props.BuscarLibro}
            parametro={this.props.libros.parametro}
            handleChangeBuscar={this.handleChangeBuscar}
            pages={this.props.libros.pages}
            current={this.props.libros.current}
        />
        <RenderError
            errC={{success: true}}
            errU={{success: true}}
            errL={this.props.libros.err}
        /> 
        <Input 
            isLoading={this.isLoading}
            AddLibro={this.verificacion}  
            libros={this.props.libros.libros}
            handleChange={this.handleChangeNuevoLibro} 
            nuevoLibro={this.props.libros.newLibro} 
            editState={this.props.libros.edit}
            editarLibroo={this.EDITARLibro2} 
            handleChangeEditLibro={this.handleChangeEditLibro} 
            fileSelecterHandler={this.fileSelecterHandler} 
        />
       </Fragment>
    )};
};

const mapStateToProps = state => {
    return {
        libros: state.libros,
        users: state.users
    }
};

const mapDispatchToProps = dispatch => {
    return { 
        NuevoLibro(libro, page) {
            dispatch(actions.nuevoLibro(libro, page));
        },
        EditarLibro(libro, page) {
            dispatch(actions.editarLibro(libro, page));
        },
        EliminarLibro(isbn, page) {
            dispatch(actions.eliminarLibro(isbn, page));
        },
        BuscarLibro(parametro) {
            dispatch(actions.buscarLibro(parametro));
        },
        saveNewLibro(libro) {
            dispatch(actions.saveNewLibro(libro));
        },
        setStateEdit() {
            dispatch(actions.setStateEdit());
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
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LibrosAdm);



