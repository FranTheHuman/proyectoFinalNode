'use strict'

import React from 'react';

import { NavLink } from 'react-router-dom';
import { withRouter } from "react-router";
import {Logout} from '../../../Actions/users';
import {connect} from 'react-redux';

const NavegacionAdmin = (props) => (  
    <nav className="nav justify-content-center"> 
      <li className="nav-item">
        <NavLink exact to="/HomeAdmin" className="nav-link" activeClassName="is-selected"><i className="fas fa-home fa-2x"></i></NavLink> 
      </li>
      <li className="nav-item">
        <NavLink exact to="/Libros/1" className="nav-link" activeClassName="is-selected"><i className="fas fa-torah fa-2x"></i></NavLink> 
      </li>
      <li className="nav-item">
        <NavLink exact to="/Usuarios" className="nav-link" activeClassName="is-selected"><i className="fas fa-users fa-2x"></i></NavLink> 
      </li>
      <li className="nav-item">
        <NavLink exact to="/Reportes" className="nav-link" activeClassName="is-selected"><i className="fas fa-chart-bar fa-2x"></i></NavLink> 
      </li>
      <li className="nav-item">
        <NavLink exact to="/Login" onClick={()=>{props.Logout()}} className="nav-link" activeClassName="is-selected"><i className="fas fa-sign-out-alt fa-2x"></i></NavLink> 
      </li>
  </nav>
);

const mapStateToProps = state => {
  return {
      users: state.users
  }
};
const mapDispatchToProps = dispatch => {
  return { 
      Logout() {
          dispatch(Logout());
      } 
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavegacionAdmin));