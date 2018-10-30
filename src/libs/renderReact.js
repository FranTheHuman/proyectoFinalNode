'use strict'
  
import path from 'path';
import express from 'express';
//import serverSideRender from './ReactRender/server-side-rendering';

module.exports = app => { 
    
    // El client rendering tiene mejor performance que el server side rendering, pero no aparece en las busquedas de los distintos buscadores

    // Funcion para detectar si el q usa la aplicacion es un bot que esta buscandolo
    const isBot = (ua) => { // valida que el user agent coincida con los siguientes buscadores
       return /curl|bot|googlebot|google|baidu|bing|msn|duckduckgo|teoma|slurp|crawler|spider|robot|crawling/i.test(ua);
    }

    // Middleware para la deteccion de bot
    app.use((req,res,next) => {
       req.isBot = isBot(req.headers['user-agent']);
       return next();
    });

    //NO FUNCIONA EL SERVER SIDE REMDERING

    // Si es un bot renderiza el server side rendering
    //app.use(serverSideRender); 

    // STATIC FILES - REACT/CLIENT APP 
    app.use(express.static(path.join(__dirname, '../public')));

    // STATIC FILES  IMAGENES
    app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

    // Ruta general de configuracion de react router
    app.get('*', (req, res) => {
       res.sendFile(path.resolve(__dirname, '../public', 'index.html'))
    })
    
    

}