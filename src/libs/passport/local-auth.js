'use strict'

/******************************************************
TODO LO REFERIDO A LA CONFIGURACION DEL MODULO PASSPORT
*******************************************************/
import localStrategy from 'passport-local'; 
import passport from 'passport';
import validator from '../Validators';

// Exporta una funcion que recibe como parametro app (express)
module.exports = (app) => {

    // Traemos el modelo, gracias a consing podemos llamarlo de esta manera.
    const User = app.db.db.models.Usuarios;
    // Cada vez que passsport va a crear un coockie para un usuario va a llamar a este metodo   
    passport.serializeUser((user, done) => {
        done(null, user.id);
    })
    // Cada vez que se a passport le llegue un id en un coockie, passport va a preguntar, tengo este id, a que usuario corresponde?
    passport.deserializeUser(async (id, done) => {
        const user = await User.findById(id);
        done(null, user);
    })
    /************
        SIGNUP
    *************/
    passport.use('local-signup', new localStrategy.Strategy({
        // Parametros
        usernameField: 'email', // Email obtenido del body
        passwordField: 'password', // Password obtenido del body
        passReqToCallback: true  // Le decimos que ademas de darnos estos datos nos de el require y el done
    },
    // Cuando se llama a la "funcion" local-signup  ejecuta una la siguiente funcion
    async (req, email, password, done) => {
        try {
            // Buscamos el email obtenido del body. 
            const user = await User.findOne({ where: { email }});
            // Si encontramos el email obtenido del body.
            if(user){ 
                // Regresa el error null, el usuario false y un mensaje de aclaracion.
                return done(null, false, ({msg: 'The Email is already Taken.'})); 
            } else { 
                if(!validator.verificarContraseña(password)){
                    return done(null, false, ({msg: 'El formato de la contraseña no es correcto.'})); 
                }
                if(!validator.VerificarEmail(email)){
                    return done(null, false, ({msg: 'El formato del email no es correcto.'})); 
                }
                // Si no lo encuentra crea un objeto
                var newUser = {
                    nombre: req.body.nombre,
                    email: email,
                    //admin: true,
                    password: User.prototype.generateHash(password)
                };   
                // Crea un nuevo usuario
                const useer = await User.create(newUser); 
                // Si no me devuelve ese usuario algo anda mal en la creacion.
                if (!useer) { return done(null, false, {msg: 'Error on creation.'}); } // Regresa el error null, el usuario false y un mensaje
                // Devolvemos el error null, y el usuario
                return done(null, useer);
            } 
        } catch (error) {
            return done(error, false);
        }
            
    }));

    /************
        LOGIN
    *************/
    passport.use('local-login', new localStrategy.Strategy({
        // Parametros
        usernameField: 'email', // Email obtenido del body
        passwordField: 'password', // Password obtenido del body
        passReqToCallback: true // Le decimos que ademas de darnos estos datos nos de el require y el done    
    },
    // Cuando se llama a la "funcion" local-login  ejecuta una la siguiente funcion
    async (req, email, password, done) => {
        try {
            // Buscamos el email obtenido del body. 
            const user = await User.findOne({ where: { email }});
            // Si no encontramos el email obtenido del body.
            if(!user){ 
                // Regresa el error null, el usuario false y un mensaje de aclaracion.
                return done(null, false, ({msg: 'No email found.'})); 
            } else if (user.ban == true) {
                return done(null, false, ({msg: 'You are banned until the administrator decides otherwise.'})); 
            } else { // Si lo encuentra 
                if(!password){
                    return done(null, false, {msg: 'Insert password'});
                }
                // Comprueba que la contraseña sea correcta
                if(!User.prototype.comparePassword(password, user)){
                    // Si no lo es, regresa el error null, el usuario false y un mensaje de aclaracion.
                    return done(null, false, {msg: 'Invalid password'});
                } else { // Si la contraseña es valida    
                    // Actualizamos su ultima conexion
                    // User.update( { last_loggin: Date.now() }, { where: { email }}); 
                    // Regresa el error null y el usuario.
                    return done(null, user);
                }  
            }
        } catch (error) {
            return done(error, false);
        }
    }
    ));
}   



