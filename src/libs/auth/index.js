'use strict'

import jwt from 'jsonwebtoken'; 

// Funcion para comprobar que el usuario tenga generado un token, un poco mas de seguridad. 
const verifyToken = (req, res, next) => {
  // Verificamos que la coockie con ese nombre exista exista 
  //if (!req.cookies.access_token) { return res.status(401).json({ error: 'UNAUTHORIZED, TOKEN IS EMPTY' }); }
  // Obtenemos el header authorizariont con el token 
  const token = req.headers['authorization']; 

  // Si el token es true, existe. 
  if(token){
      // Los token tienen 5 horas y luego expiran, el usuario debe iniciar sesion nuevamente para actualizarlo
      var verifyOptions = {  expiresIn:  "5h"  };
      // Usamos la funcion de jwt para verificar el token obtenido.
      jwt.verify(token, req.app.get('superSecret'), verifyOptions, (err, decoded) => {
          if(err){
              // Si obtenemos un erro devolvemos el siguiente mensaje.
              return res.json({ success: false, message: 'authentication failed.' });
          } else { 
              if(decoded.user.ban){
                return res.json({ success: false, message: 'You are banned until the administrator decides otherwise.' });
              }
              // Enviamos el email hacia las rutas, en las cuales sera nombrado como id por que al principio enviaba el id
              req.TokenDecodificado = decoded.user.email;
              // Continuamos con la ejecucion del codigo.
              next();
          }
      })
  } else{
      // Si no obtenemos el token enviamos el siguiente mensaje.
      return res.status(403).send({ success: false, message: 'authentication failed.' })
  }
};

const verifyTokenAdmin = (req, res, next) => {
    // Obtenemos el token de el body o de una variable en la ruta o de la cabezera llamada authorization.  
    const token = req.headers['authorization'];
    // Si el token es true, osea existe. 
    if(token){ 
        // Los token tienen 5 horas y luego expiran, el usuario debe iniciar sesion nuevamente para actualizarlo
        var verifyOptions = {  expiresIn:  "5h"  };
        // Usamos la funcion de jwt para verificar el token obtenido.
        jwt.verify(token, req.app.get('superSecret'), verifyOptions, (err, decoded) => {
            if(err){
                // Si obtenemos un erro devolvemos el siguiente mensaje.
                return res.json({ success: false, message: err.message });
            } else { 
                //Comprobamos que sea admin
                if(decoded.user.admin){
                    // Enviamos el email hacia las rutas, en las cuales sera nombrado como id por que al principio enviaba el id
                    req.TokenDecodificado = decoded.user.email;
                    // Continuamos con la ejecucion del codigo.
                    next();
                } else {
                    return res.json({ success: false, message: "You don't have this level of access." });
                }
            }
        })
    } else{
        // Si no obtenemos el token enviamos el siguiente mensaje.
        return res.status(403).send({ success: false, message: 'authentication failed.' })
    }
  };

// Funcion para verificar que el usuario se encuentre loggeado 
const isloggedIn = (req, res, next) => {
    if (req.isAuthenticated()) { // utilizamos la funcion isAuthenticated que nos provee passport en el request para saber si ah iniciado session.
        next();
    } else return res.status(403).send({ success: false, message: 'Initializate session.' });
}

// Funcion para verificar que el usuario que se encuentre loggeado tenga la capacidad de eliminarse/editarse 
// o si es admin de eliminar/editar a alguien
const isloggedInAdmin = async (req, res, next) => { 
    if (req.isAuthenticated()) { // utilizamos la funcion isAuthenticated que nos provee passport en el request;
        if(req.user.admin){ // verificamos que los datos del usuario del request sean de un administrador
            next();
        }
        else return res.status(403).send({ success: false, message: 'Dont have this level of access.' });
    } else return res.status(403).send({ success: false, message: 'Initializate session.' });
    
}

// Exportamos las funciones creadas en este archivo para que los demas archivos puedan utilizarlas
module.exports = {
    verifyTokenAdmin,
    verifyToken,
    isloggedIn,
    isloggedInAdmin
}