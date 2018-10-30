'use strict'

import express from 'express';
import consign from 'consign';
    
/*
|--------------------------------------------------------------------------
| EXPRESS
|--------------------------------------------------------------------------
| Express es una infraestructura de aplicaciones web Node.js mínima y flexible que proporciona un conjunto sólido de características 
| para las aplicaciones web y móviles.
|
| Con miles de métodos de programa de utilidad HTTP y middleware a su disposición, la creación de una API sólida es rápida y sencilla.
|
|--------------------------------------------------------------------------
| CONSING
|--------------------------------------------------------------------------
| Consign hace que las aplicaciones sean más fáciles de desarrollar con la separación de archivos lógica y la carga automática de scripts.
| 
| El envío se puede utilizar para cargar automáticamente modelos, rutas, esquemas, configuraciones, controladores, mapas de objetos ... etc ...
|
| Directorio base (cwd)
| Consign simplemente usará una ruta relativa de su directorio de trabajo actual, sin embargo,
| a veces no desea incluir archivos fuertemente anidados en la cadena de objetos
|
*/
    const app = express();
    consign({cwd: __dirname})  
        .include('db/config.js')  // tiene solo la configuracion de la bd
        .then('db/db.js') // Devuelve la configuracion de la conexion y todos los modelos que puedo utilizar de la base de datos
        .then('libs/middlewares.js') // configuracion de express 
        .then('api') // rutas de el servidor
        // Middlewares para determinar si usar server side rendering o client rendering en react y archivos estaticos
        .then('libs/renderReact.js')  
        .then('libs/boot.js') // inicio el servidor
        .into(app); // todas esta parte de nuestra aplicacion del servidor necesitan a app, le los paso por alli
     
