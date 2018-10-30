'use strict'

import libros from './libros'; 
import comentarios from './comentarios';
import users from './users';
import reportes from './Reportes';

import { combineReducers } from 'redux';
// import { combineReducers } from 'redux-immutable';

const rootReducer = combineReducers({
    libros,
    comentarios,
    users,
    reportes
});

export default rootReducer;