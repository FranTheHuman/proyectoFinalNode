'use strict'

import React from 'react';

import { NavLink, Redirect } from 'react-router-dom';
import { withRouter } from "react-router";
import {Logout} from '../../../Actions/users';
import {connect} from 'react-redux';

const NavegacionUser = (props) => (
    <nav className="nav justify-content-center">
      <li className="nav-item">
        <NavLink exact to="/" className="nav-link" activeClassName="is-selected"><i className="fas fa-home fa-2x"></i></NavLink> 
      </li>
      <li className="nav-item">
        <NavLink exact to="/LibrosU/1" className="nav-link" activeClassName="is-selected"><i className="fas fa-torah fa-2x"></i></NavLink> 
      </li>
      <li className="nav-item">
        <NavLink exact to={
          props.users.userDetails.user == undefined ?
          <Redirect to='/Login' />
          :
          `/PerfilU/${props.users.userDetails.user.id}`
        } className="nav-link" activeClassName="is-selected"><i className="fas fa-user fa-2x"></i></NavLink> 
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavegacionUser)); 