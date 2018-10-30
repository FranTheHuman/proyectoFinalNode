'use strict'

// Modulos
import session from 'express-session';
import express from 'express';
import passport from 'passport'; 
 
//import cookieParser from 'cookie-parser';
const pgSession = require('connect-pg-simple')(session);
 
import pass from './passport/local-auth';

module.exports = (app) => {
 
    const config = app.db.config;
    const conString = `postgres://${config.development.username}:${config.development.password}@${config.development.host}:5432/${config.development.database}`;

    // SETTINGS
    app.set('port', process.env.PORT || 4000); 
    app.set('superSecret', process.env.TOKEN); // Token 

    // MIDDLEWARES 
    app.use(express.json());
    app.use(express.urlencoded({extended:false}));
    app.use(session({ 
        secret: process.env.FOO_COOKIE_SECRET || process.env.COOKIE_SECRET,  
        resave: true, 
        saveUninitialized: false, 
        store: new pgSession({ conString,  tableName: 'UserSessions' }),
        cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
    }));
    //app.use(cookieParser());
    app.use(passport.initialize()); 
    app.use(passport.session());
     
    // Instanciamos las configuraciones de passport para utilizarlas en las rutas de app (express)
    pass(app);
}

/*
MODULOS UTILIZADOS:
|---------------------------------------------------------------------------------------------------------------------------------------
|    - EXPRESS SESSION: 
|---------------------------------------------------------------------------------------------------------------------------------------
|      Modulo que permite a express/nodeJs identificar sesiones de un mismo usuario mediante una cookie enviada al navegador unicamente 
|      al iniciar una nueva session (este cookie tiene un valaor, un id ecnriptado con un parametro que le pasamos al iniciarlo, una expiracion, 
|      etc). La coockie almacenada en el navegador permite al servidor saber quien es el que esta haciendo la llamada al servidor de express. 
|      
|      Parametros al iniciarlo:
|        1. String utilizado por un algoritmo de criptografia que lo utiliza para encriptar los id enviados al cliente.(Debe ser aleatorio)
|        2. Resave: Fuerza a q cada llamada que se haga al servidor la info de la session se guarda en la bd 
|        sin importar si hubo un cambio o no.
|        3. SaveUninitialized: cada vez que hay una llamada a nuestro servidor, la sesion es un simple objeto que al principio esta en blanco. 
|        cuando ocurre una llamada inicial este objeto esta vacio y esta opcion guarda en la bd este objeto vacio
|
|      ¿Almacenar las cookies?
|
|      La informacion de la sesion esta guardada en la memoria por lo que si hay un problema se pierde la informacion de la sesion. 
|      Para evitar esto utilizamos *** CONNECT PG SIMPLE *** (En el caso de usar bd Postgres), el cual nos permite pasar como parametro a 
|      express session que la informacion de la session va a ser almacenada en una tabla de nuesrtta base de datos.
|
|      Query para la tabla de sesiones : 
|
|        CREATE TABLE "UserSessions" (
|            "sid" varchar NOT NULL COLLATE "default",
|            "sess" json NOT NULL,
|            "expire" timestamp(6) NOT NULL
|        )
|        WITH (OIDS=FALSE);
|        ALTER TABLE "UserSessions" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") 
|        NOT DEFERRABLE INITIALLY IMMEDIATE;
|---------------------------------------------------------------------------------------------------------------------------------------
|    - PASSPORT
|---------------------------------------------------------------------------------------------------------------------------------------
|       Framework para construir la autenticación de nuestras aplicaciones Node.js.
|       Una de las ventajas que nos permitirá crear la autenticación web de nuestra aplicación basada en su abanico de más de 30 plugins 
|       disponibles para seguir diversas estrategias. Ya sea con login y password, Twitter, Facebook, OpenID, OAUth...
|
|        La API es simple: realizamos una petición de autenticación por medio de Passport, y Passport nos proporciona 
|        los componentes para controlar que sucede cuando la autenticación es exitoso o falla.     
|---------------------------------------------------------------------------------------------------------------------------------------
|    - COOKIE PARSER (No lo uso, pero me parecio buena idea aprender al menos un poco y dejarlo aca por si se necesita)
|---------------------------------------------------------------------------------------------------------------------------------------
|        Las cookies son pequeñas porciones de datos enviadas por un sitio web y que son almacenadas en el navegador del usuario 
|        mientras éste navega por dicho sitio web. Cada vez que el usuario vuelve a ese sitio web, el navegador envía 
|        esas porciones de datos a la página web o servidor para conocer la actividad previa del usuario en ese sitio web.
|
|        Cookie-parser analiza el encabezado Cookie y rellena req.cookies con objeto marcado con los nombres de las cookies. 
|        Para establecer una nueva cookie, podemos definir una nueva ruta en la aplicación Express.
|---------------------------------------------------------------------------------------------------------------------------------------
|    - CLOUDINARY
|---------------------------------------------------------------------------------------------------------------------------------------
|        Es un servicio web, que ofrece a sus usuarios la gestión avanzada de imágenes, añadiendo características de manipulación 
|        mediante el uso de su API.
*/

