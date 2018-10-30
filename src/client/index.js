'use strict'

import React from 'react';
import {render} from 'react-dom'; 

// Aplicacion
import App from './Components/index';

// Redux store
import store from './store';
import {Provider} from 'react-redux';
  
// DOM
const appElement = document.getElementById('App');

// Rendering App
render(
    <Provider store={store}> 
        <App /> 
    </Provider>,
    appElement
  );

/*
|--------------------------------------------------------------------------
| REACT
|--------------------------------------------------------------------------
|
|
|
|
*/