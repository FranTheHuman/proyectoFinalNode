'use strict' 

import { createStore, applyMiddleware} from 'redux'; 

import logger from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';  

import {setCurrentUser} from './Actions/users';
import jwt from 'jsonwebtoken'; 

// Reducers     
import reducer from './Reducers'; 
 
/*
|--------------------------------------------------------------------------
| REDUX
|--------------------------------------------------------------------------
|
| Es un contenedor del estado predecible para nuestras aplicaciones.
| Es un contenedor del estado predecible para aplicaciones de JavaScript de front-end complejas.
|
| ¿cuando debo usar redux en que casos específicos debería usarlo? 
|  Basicamente cuando necesitas compartir el estado entre muchos componentes y el pasarlo de padre a hijo se vuelve muy complejo.
| 
| Store: Es el centro y la verdad de todo, con métodos para actualizar, obtener y escuchar datos.
| Actions: Son bloques de información que envían datos desde la aplicación hacia el store.
| Reducers:Cambian el estado de la aplicación.
|
*/
 
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(logger, thunk))
);
 
// Si el token sigue guardado en el localstrage, por mas que recarguemos la pagina no perdemos los datos del usuario
if(localStorage.jwtToken) {
  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
} 

export default store;


