'use strict'

import { verifyToken, verifyTokenAdmin, isloggedIn, isloggedInAdmin } from '../libs/auth/index';
import { verifyUser } from '../libs/verifyUserRoutes/index';
import validator from '../libs/Validators/index';

module.exports = app => {
  
    const Usuarios = app.db.db.models.Usuarios;

    /***********************
      BAJA Y MODIFICACION
    ***********************/

    // MODIFICAR UN USUARIO
    app.put('/UserEdit/:id/api/v1', verifyToken, isloggedIn, async (req, res) => {
      // Declaramos una transaccion
      let transaction;
      try {

        // Obtenemos el token verificado anteriormente
        const idUser = req.TokenDecodificado;
        // Verificamos que el token verificado anteriormente, sea de unusuario que exista
        if(!verifyUser(app, idUser)){ // Si devuelve false
          req.logout();  // Deslogueamos al usuario
          res.status(400).json({success: false, message: "User not found."}); // enviamos un mensaje informativo
        }

        // Obtenemos el id del usuario que vamos a modificar
        const { id } = req.params;

        // Si el id del token es diferente al id que queremos modificar
        if(id != idUser || isNaN(id)){
           res.status(400).json({success: false, message: "Action not allowed."}); // enviamos un mensaje informativo
        }

        // Iniciamos una transaccion
        transaction = await app.db.db.sequelize.transaction();
        // Creamos un objeto vacio que contendra los nuevos datos del usuario
        const UserEditDespues = {};
        // Si existe un email en el body es porque se desea actualizar el email
        if(req.body.email != "") { 
            // buscamos ese nuevo email entre los usuarios
            const result2 = await Usuarios.findOne({ where: { email : req.body.email }} );
            // si el resultado es falso es porque el email no existe
            if (!result2) { UserEditDespues.email = req.body.email; } // Guardamos el email en el objeto
            else { res.status(400).json({success: false, message: "The Email is already Taken."});  } // si el email existe enviamos un mensaje 
        } 
        // Si existe un nombre en el body es porque se desea actualizar el nombre
        if(req.body.nombre != "") { UserEditDespues.nombre = req.body.nombre; }
        // Si existe una segunda contraseña en el body es porque se desea actualizar la contraseña
        if(req.body.password2OwO != "") { UserEditDespues.password = Usuarios.prototype.generateHash(req.body.password2OwO); }
        // Si el usuario no ingreso su contraseña actual enviamos un mensaje para que lo haga
        if(req.body.password == "") { res.status(400).json({success: false, message: "Enter your actual password."});  }

        // Buscamos al usuario por id 
        const result = await Usuarios.findOne({ where: { id }} );
        // Comparamos la contraseña encriptada con la ingresada en el body
        if (Usuarios.prototype.comparePassword(req.body.password, result)){
          // Actualizamos al usuario si la comparacion es verdadera
          const resultt = await Usuarios.update(UserEditDespues, { where: { id } });
          console.log(resultt);
          // Si el codigo llego hasta aqui, no hubo errores, por lo cual confirmamos la transaccion 
          await transaction.commit();
          // Devolvemos un mensaje 
          res.status(200).json({success: true, message: "Usuario Edited."}); 
        } else { 
          // Si el codigo entra aqui, es porque la contraseña que ingreso no coincide con la del usuario que quiere modificar
          // por lo tanto enviamos el siguiente mensaje
          res.status(412).json({success: false, message: "Password incorrect."});
        }
      } catch (error) {
        // Si el codigo entra aqui, hubo algun error en el codigo anterior, por lo tanto volvemos hacia atras la transaccion
        await transaction.rollback();
        // Enviamos un mensaje con el error
        res.status(412).json({success: false, message: error.message});
      }  
    });
  
    // BANEAR UN USUARIO
    app.put('/UserBan/:id/api/v1', verifyToken, isloggedIn, async (req, res) => {
      // Declaramos una transaccion
      let transaction;
      try {

        // Obtenemos el token verificado anteriormente
        const idUser = req.TokenDecodificado;
        // Verificamos que el token verificado anteriormente, sea de unusuario que exista
        if(!verifyUser(app, idUser)){ // Si devuelve false
          req.logout();  // Deslogueamos al usuario
          res.status(400).json({success: false, message: "User not found."}); // enviamos un mensaje informativo
        }

        // Obtenemos el id del usuario que vamos a modificar
        const { id } = req.params;

        // vemos si el ususario actual es administrador
        const user = await Usuarios.findOne({ where: { email: idUser }}); 

        // Si el usuario no es admin
        if(user.admin == false){
          res.status(400).json({success: false, message: "Action not allowed."}); // enviamos un mensaje informativo
        }

        // Iniciamos una transaccion
        transaction = await app.db.db.sequelize.transaction();  

        // Editamos el usuario por id 
        await Usuarios.update({ban: true, TiempoBan: new Date()}, { where: { id } }); 
        await transaction.commit();
        res.status(200).json({success: true, message: "Usuario Baned."});  

      } catch (error) {
        // Si el codigo entra aqui, hubo algun error en el codigo anterior, por lo tanto volvemos hacia atras la transaccion
        await transaction.rollback();
        // Enviamos un mensaje con el error
        res.status(412).json({success: false, message: error.message});
      }  
    });

    // DESBANEAR UN USUARIO
    app.put('/UserDesBan/:id/api/v1', verifyToken, isloggedIn, async (req, res) => {
      // Declaramos una transaccion
      let transaction;
      try {

        // Obtenemos el token verificado anteriormente
        const idUser = req.TokenDecodificado;
        // Verificamos que el token verificado anteriormente, sea de unusuario que exista
        if(!verifyUser(app, idUser)){ // Si devuelve false
          req.logout();  // Deslogueamos al usuario
          res.status(400).json({success: false, message: "User not found."}); // enviamos un mensaje informativo
        }

        // Obtenemos el id del usuario que vamos a modificar
        const { id } = req.params;

        // vemos si el ususario actual es administrador
        const user = await Usuarios.findOne({ where: { email: idUser }}); 

        // Si el usuario no es admin
        if(user.admin == false){
          res.status(400).json({success: false, message: "Action not allowed."}); // enviamos un mensaje informativo
        }

        // Iniciamos una transaccion
        transaction = await app.db.db.sequelize.transaction();  

        // Editamos el usuario por id 
        await Usuarios.update({ban: false, TiempoBan: null}, { where: { id } }); 
        await transaction.commit();
        res.status(200).json({success: true, message: "Usuario DesBaned."});  

      } catch (error) {
        // Si el codigo entra aqui, hubo algun error en el codigo anterior, por lo tanto volvemos hacia atras la transaccion
        await transaction.rollback();
        // Enviamos un mensaje con el error
        res.status(412).json({success: false, message: error.message});
      }  
    });

    // ELIMINAR UN USUARIO
    app.delete('/UserDelete/:id/api/v1', verifyTokenAdmin, isloggedInAdmin, async (req, res) => {
          
      // Declaramos una transaccion
      let transaction;
      try {

        // Obtenemos el token verificado anteriormente
        const idUser = req.TokenDecodificado;
        // Verificamos que el token verificado anteriormente, sea de unusuario que exista
        if(!verifyUser(app, idUser)){ // Si devuelve false
          req.logout();  // Deslogueamos al usuario
          res.status(400).json({msg: "User not found."}); // enviamos un mensaje informativo
        }
      
        // Obtenemos el id del usuario que vamos a modificar
        const { id } = req.params;
      
        // Si el id del token es diferente al id que queremos modificar
        if(id != idUser || isNaN(id)){
           res.status(400).json({msg: "Action not allowed."}); // enviamos un mensaje informativo
        }

        // Iniciamos una transaccion
        transaction = await app.db.db.sequelize.transaction();
        // Comparamos la contrasela encriptada con la ingresada en el body
            // Eliminamos al usuario
            await Usuarios.destroy({where: { id }});
            // Si el codigo llego hasta aqui, no hubo errores, por lo cual confirmamos la transaccion 
            await transaction.commit();
            // Devolvemos un mensaje 
            res.status(200).json({ msg: "Usuario Deleted."}); 
      } catch (error) {
        // Si el codigo entra aqui, hubo algun error en el codigo anterior, por lo tanto volvemos hacia atras la transaccion
        await transaction.rollback();
        // Enviamos un mensaje con el error
        res.status(412).json({msg: err.message});
      }  
    });

    /***********
      CONSULTAS
    ***********/

    // OBTENER TODOS LOS USUARIOS NORMALES
    app.get('/Users/api/v1', verifyTokenAdmin,  isloggedInAdmin, async (req, res) => { 

      try {

        // Obtenemos el token verificado anteriormente
        const idUser = req.TokenDecodificado;
        // Verificamos que el token verificado anteriormente, sea de unusuario que exista
        if(!verifyUser(app, idUser)){
          req.logout();  // Deslogueamos al usuario
          res.status(400).json({msg: "User not found."}); // enviamos un mensaje informativo
        }

        // Buscamos todos los usuarios ordenados por nombre que no sean admin
        const result = await Usuarios.findAll({ order: [ 'nombre' ], attributes: [ 'id', 'nombre', 'email', 'ban', 'TiempoBan' ], where: { admin: false }} );
        res.status(200).json(result);
      } catch (error) {
        res.status(412).json({msg: error.message});
      }
      
    });

    // OBTENER USUARIOS NORMALES - PAGINACION
    app.get('/UsersPaginacion/:page/api/v1', verifyTokenAdmin,  isloggedInAdmin, async (req, res) => { 

      try {
  
        // Obtenemos el token verificado anteriormente
        const idUser = req.TokenDecodificado;
        // Verificamos que el token verificado anteriormente, sea de unusuario que exista
        if(!verifyUser(app, idUser)){
          req.logout();  // Deslogueamos al usuario
          res.status(400).json({ success: false, message: "User not found."}); // enviamos un mensaje informativo
        }
  
        let perPage = 20;
        let page = parseInt(req.params.page);
        let skip = (perPage * page) - perPage; 
        const result = await Usuarios.findAndCountAll({limit: perPage, offset: (perPage * page) - perPage, attributes: [ 'id', 'nombre', 'email', 'ban', 'TiempoBan'], where: { admin: false }}); 
        const respuesta = {usuarios: result.rows, current: page, pages: Math.ceil(result.count / perPage)};
  
        res.status(200).json(respuesta);
      } catch (error) {
        res.status(412).json({ success: false, message: error.message});
      }
      
    });

    // OBTENER TODOS LOS NOMBRES DE LOS USUARIOS NORMALES
    app.get('/UsersNames/api/v1', verifyToken,  isloggedIn, async (req, res) => { 

      try {

        // Obtenemos el token verificado anteriormente
        const idUser = req.TokenDecodificado;
        // Verificamos que el token verificado anteriormente, sea de unusuario que exista
        if(!verifyUser(app, idUser)){
          req.logout();  // Deslogueamos al usuario
          res.status(400).json({success: false, message: "User not found."}); // enviamos un mensaje informativo
        }

        // Buscamos todos los usuarios ordenados por nombre que no sean admin
        const result = await Usuarios.findAll({ order: [ 'nombre' ], attributes: [ 'id', 'nombre', 'ban', 'TiempoBan'], where: { admin: false }} );
        res.status(200).json(result);
      } catch (error) {
        res.status(412).json({success: false, message: error.message});
      }
      
    });

    // OBTENER TODOS LOS USUARIOS NORMALES POR PARAMETRO DESCONOCIDO
    app.get('/Users/:parametro/api/v1', verifyTokenAdmin,  isloggedInAdmin, async (req, res) => { 

      try {
        
        // Obtenemos el token verificado anteriormente
        const idUser = req.TokenDecodificado;
        // Verificamos que el token verificado anteriormente, sea de unusuario que exista
        if(!verifyUser(app, idUser)){
          req.logout();  // Deslogueamos al usuario
          res.status(400).json({msg: "User not found."}); // enviamos un mensaje informativo
        }   

        const { parametro } = req.params;
        //const Parametro = Parametro.charAt(0).toUpperCase() + Parametro.slice(1); 

        if(!validator.VerificarEmail(parametro) && !validator.verificarNombre(parametro)){
          res.status(400).json({ success: false, message: "El formato del parametro de busqueda es incorrecto."});
        } else {
          const email = await Usuarios.findAll({where: { email: parametro }, order: [ 'nombre' ], attributes: [ 'id', 'nombre', 'email' ]});
          if(email.length === 0){
             const nombre = await Usuarios.findAll({where: { nombre: parametro }, order: [ 'nombre' ], attributes: [ 'id', 'nombre', 'email' ]});
              if(nombre.length === 0){
                res.status(412).json({msg: "No data found."});
              } else {
                res.status(200).json(nombre);
              }
          } else {
             res.status(200).json(email);
          } 
        }
      } catch (error) {
        res.status(412).json({msg: error.message});
      }
      
    });

}

