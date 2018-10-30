'use strict'
  
import React from 'react';
import {renderToString} from 'react-dom/server'; 

/*
MODULOS UTILIZADOS:
|---------------------------------------------------------------------------------------------------------------------------------------
|  REACT - SERVER SIDE RENDERING: 
|---------------------------------------------------------------------------------------------------------------------------------------
|
| React puede ser utilizado como aplicacion cliente o ser renderizada en el servidor.
|  No es muy efectivo, la aplicacion pierdde perfomance.
|    
*/

// Aplicacion React
import App from '../../public/js/proyfinal';

// Redux store
import store from '../../client/store';
import {Provider} from 'react-redux';

// HTML
import {html} from './html/index';

const serverSideRender = (req,res,next) => { 
    // Si el user agent es un bot pasamos ejecutamos server side rendering
    if(req.isBot) {
        const markup = renderToString(
            <Provider store={store}>
                <App />
            </Provider>
        );
        res.send(html({
            markup
        }));
    }
    return next();
    
};

export default serverSideRender;