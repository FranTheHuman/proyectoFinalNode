'use strict'

import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../Actions/users';
import {Redirect} from 'react-router-dom'

import Navegacion from '../navegacion/index'; 
import Search from './search/index';
import Table from './tabla/index';
import Paginacion from './paginacion/paginacion'; 
import RenderError from '../../RenderError/index';

class Usuarios extends Component {
    
    redirect = () => {  
        // guardamos el token q deberia encontrarse alli
        const token = localStorage.getItem('jwtToken'); 
        if(
            !token || // si el token es false (no esta definido o no posee nada)
            this.props.users.userDetails == undefined || // o los datos del usuario no estan definidos
            this.props.users.userDetails.user.admin == false || // o los datos del usuario autenticado no es de un administrador
            this.props.users.err.message == "authentication failed."   // o los errores del state poseen este mensaje 
        ){
            // removemos el posible token q se encuentre en loclastorage
            localStorage.removeItem('jwtToken');
            // Redireccionamos al login
            return <Redirect to='/Login'/>
        } 
    } 
  
    handleChangeBuscar = (e) => { 
        const  { value }  = e.target; 
        var par = value;
        this.props.saveParametro(par);     
    };

    componentDidMount(){
        this.props.loadUsers();
    }

    render(){
        return( 
            <Fragment>
                {this.redirect()}
                <Navegacion/>
                <div className="mt-5">
                <RenderError
                    errL={{success: true}}
                    errU={this.props.users.err}
                    errC={{success: true}}
                />
                    <div className="row"> 
                        <div className="col-sm-8 ml-5">
                            <Table
                                users={this.props.users.users}
                                DesBanUser={this.props.DesBanUser}
                                BanUser={this.props.BanUser}
                            /> 
                            <Paginacion />
                        </div>
                        <Search
                            parametro={this.props.users.parametro}
                            handleChangeBuscar={this.handleChangeBuscar}
                            buscarUser={this.props.buscarUser}
                        />
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

const mapDispatchToProps = dispatch => {
    return { 
        loadUsers() {
            dispatch(actions.loadUsers());
        },
        BanUser(id) {
            dispatch(actions.BanUser(id));
        },
        DesBanUser(id) {
            dispatch(actions.DesBanUser(id));
        },
        buscarUser(parametro) {
            dispatch(actions.buscarUser(parametro));
        },
        saveParametro(parametro) {
            dispatch(actions.saveParametro(parametro));
        }  
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Usuarios);