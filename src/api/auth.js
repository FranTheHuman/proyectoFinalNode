'use strict'

import passport from 'passport';
import jwt from 'jsonwebtoken';
  

/*
    AUTENTICACION BASADA EN TOKENS
    ________________________________

    Cuando el usuario se autentica con sus credenciales o cualquier otro método, en la respuesta recibe un token (access token). 
    A partir de ese momento, todas las peticiones que se hagan al API llevarán este token en una cabecera HTTP de modo que el servidor 
    pueda identificar qué usuario hace la petición sin necesidad de buscar en base de datos ni en ningún otro sistema de almacenamiento.

    Con este enfoque, la aplicación pasa a ser escalable, ya que es el propio cliente el que almacena su información de autenticación, 
    y no el servidor. Así las peticiones pueden llegar a cualquier instancia del servidor 
    y podrá ser atendida sin necesidad de sincronizaciones.
    Diferentes plataformas podrán usar el mismo API
    Además se incrementa la seguridad, evitando vulnerabilidades CSRF, al no existir sesiones. 
    Y si añadimos expiración al token la seguridad será aún mayor.

    EN ESTE PROYECTO APLIQUE TANTO TOKENS COMO SESSIONES POR UNA CUESTION DE APRENDIZAJE.

    JWT (JSON Web Token)
    ____________________

    JSON Web Token (JWT) es un estandar abierto basado en JSON para crear tokens de acceso que permiten el uso de recursos de una aplicación 
    o API. Este token llevará incorporada la información del usuario que necesita el servidor para identificarlo, así como información 
    adicional que pueda serle útil (roles, permisos, etc.).

    Además podrá llevar incorporado tiempo de validez. Una vez pasado este tiempo de validez, el servidor no permitirá más el acceso 
    a recursos con dicho token. En este paso, el usuario tendrá que conseguir un nuevo access token volviéndose a autenticar o 
    con algún método adicional: refresh token.

    JWT define JSON como el formato interno a usar por la información almacenada en el token. Además, 
    puede llegar a ser muy útil si se usa junto a JSON Web Signature (JWS) y JSON Web Encryption (JWE).

    La combinación de JWT junto con JWS y JWE nos permite no sólo autenticar al usuario, 
    sino enviar la información encriptada para que sólo el servidor pueda extraerla, 
    así como validar el contenido y asegurarse que no ha habido suplantaciones o modificaciones.

    Un token JWT está formado por 3 partes separadas por un . siendo cada una de ellas:
    - cabecera (header): con el tipo (JWT) y el tipo de codificación
    - Cuerpo (payload): Es donde se encontrará la información del usuario que permitirá al servidor discernir 
    si puede o no acceder al recurso solicitado
    - Firma de verificación (signature): Se aplicará la función de firmado a los otros dos campos del token para 
    obtener el campo de verificación
*/

// Funcion para ayudar al cliente, cuando se crea un usuario, a asegurarse de la contraseña ingresada.
const SamePassword = (req, res, next) => {
    // Si la propiedad password y password2 que llegan en el request por el body sean iguales.
    if(req.body.password == req.body.passwordOwO){
        // la ejecucion del codigo continua.
        return next();
    } 
    // si no, devuelve un mensaje informando que las contraseñas no coinciden.
    return res.status(400).json({ success: false, message: "Passwords do not match"});
}

module.exports = app => {
   
    // PETICION POST A LOGIN
    app.post('/login', (req, res, next) => {
        // Utilizamos la funcion local login creada en las configuraciones de passport.
        passport.authenticate('local-login', (err, user, info) => {
          // Si ocurre un error en la autenticacion enviamos el error como mensaje.
          if (err) { return res.status(400).json({ success: false, message: err.message}); }
          // Si la info existe es porque devolvio un mensaje al intentar loggear al usuario.
          if (info) { return res.status(400).json({ success: false, message: info.msg}); }
          // Si el usuario es nulo (local login no lo devuelve) asumimos que ese usuario no existe .
          if (!user) { return res.status(400).json({ success: false, message: "Email not found"}); }
          // Si encuentra al usuario, utilizamos la funcion logIn que nos provee passport .
          req.logIn(user, async (err) => {
            // Si ocurre un error en el login enviamos el error como mensaje.
            if (err) { return res.status(400).json({ success: false, message: err.message}); }
            // Si no, creamos y enviamos el token.
            const token = await jwt.sign(
                {user}, // datos del token
                req.app.get('superSecret'),  // firma 
                { expiresIn: '5h' }); // expiracion   
            // creamos una coockie con ese token
            //res.cookie('access_token', token, { maxAge: new Date(Date.now() + 1000000), httpOnly: false, }); 
            //return res.redirect('/Home', {user, token}); 
            res.status(200).json({token});
          });
        })(req, res, next);
    });
 
    // PETICION POST A SIGNUP
    app.post('/signup', SamePassword, (req, res, next) => {
        // Utilizamos la funcion local login creada en las configuraciones de passport.
        passport.authenticate('local-signup', async (err, user, info) => {
          // Si ocurre devuelve un error.
          if (err) { return res.status(400).json({ success: false, message: err.message}); } 
          // Si la info existe es porque devolvio un mensaje al intentar crear al usuario.
          if (info) { return res.status(400).json({ success: false, message: info.msg}); }
          // si el usuario existe es porque la carga fue correcta.
          if (user) {
                req.logIn(user, async (err) => {
                    // Si encuentra al usuario, utilizamos la funcion logIn que nos provee passport .
                    if (err) { return res.status(400).json({ success: false, message: err.message}); }
                    // Creamos un token y enviamos el token.
                    const token = await jwt.sign(
                        {user}, // datos del token
                        req.app.get('superSecret'),  // firma 
                        { expiresIn: '5h' }); // expiracion  
                    // creamos una coockie con ese token
                    //res.cookie('access_token', token, { maxAge: new Date(Date.now() + 1000000), httpOnly: false, });
                    //return res.redirect('/Home', {user, token}); 
                    res.status(200).json({token});
                }); 
          };        
        })(req, res, next);
    });
    
    // FUNCION PARA DESLOGUEARSE
    app.get('/logout', (req, res) => {
        req.logout(); // Metodo que passport les agrega a los request para eliminar la sesion
        req.session.destroy();
        // Eliminamos la coockie 
        //res.clearCookie('access_token', req.cookies.access_token, { maxAge: new Date(Date.now() + 10000000), httpOnly: false, });
        res.status(200).json({ success: true, message: `Deslogueado and Cookie deleted`});  
    });

    

}



