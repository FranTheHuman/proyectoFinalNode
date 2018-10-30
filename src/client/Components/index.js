'use strict'

import React, { Component, Fragment, Suspense, lazy} from 'react'; 
import {Route, Switch, BrowserRouter } from 'react-router-dom';   

// Componentes Auth
import Login from './auth/login';
import Signup from './auth/signup';
import NotFoundRoute from './404/index';
// Componentes Admin

// Importamos dinamicamente con React.Lazy (renderiza componentes solo cuando los utilizas y no los renderea por mas q no los uses: (asincronamente))
//const InicioA = lazy(()=> import('./admin/inicio'));
//const PerfilA = lazy(()=> import('./admin/perfil'));
//const Usuarios = lazy(()=> import('./admin/usuarios'));
//const LibrosA = lazy(()=> import('./admin/libros'));
//const Reportes = lazy(()=> import('./admin/Reportes'));
// ESPERAR UN TIEMPO PORQUE AUN NO FUNCIONA SIN EL CREATE APP REACT

import InicioA from './admin/inicio';
import LibrosA from './admin/libros';
import PerfilA from './admin/perfil';
import Usuarios from './admin/usuarios'
import Reportes from './admin/reportes';

// Componentes User
import InicioU from './user/inicio';
import LibrosU from './user/libros'; 
import PerfilU from './user/perfil';


class App extends Component {
 
  render() {
    return ( 
       <BrowserRouter>
          <Fragment>
            <Switch>
                <Route exact path="/Login" component={Login} exact/>
                <Route exact path="/Signup" component={Signup} exact/>
                {/* ADMIN */}
                <Route exact path="/HomeAdmin" component={InicioA} exact/>
                {/* <Route 
                    path="/HomeAdmin" 
                    render={()=> (
                      <Suspense fallback={<div>Loading...</div>}>
                        <InicioA/>
                      </Suspense>
                    )} exact/> */}
                <Route exact path="/Libros/:page" component={LibrosA} exact/> 
                <Route exact path="/Perfil/:id" component={PerfilA} exact/> 
                <Route exact path="/Usuarios" component={Usuarios} exact/>  
                <Route exact path="/Reportes" component={Reportes} exact/>
                {/* USERS */}
                <Route exact path="/" component={InicioU} exact/>
                <Route exact path="/LibrosU/:page" component={LibrosU} exact/>
                <Route exact path="/PerfilU/:id" component={PerfilU} exact/>
                {/* 404 */}
                <Route component={NotFoundRoute} />
            </Switch>
          </Fragment>
       </BrowserRouter>  
    );
  }
}
 
export default App;
   