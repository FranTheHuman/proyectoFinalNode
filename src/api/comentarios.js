'use strict'

import { verifyToken,  isloggedIn } from '../libs/auth/index';
import { verifyUser } from '../libs/verifyUserRoutes/index';

module.exports = app => {
  
    const Comentarios = app.db.db.models.Comentarios;
    const User = app.db.db.models.Usuarios;

    /***********
        ABM
    ***********/

    // CREAR COMENTARIO
    app.post('/Comentarios/api/v1', verifyToken, isloggedIn, async (req, res) => {

      // Obtenemos el token verificado anteriormente
      const idUser = req.TokenDecodificado;
      // Verificamos que el token verificado anteriormente, sea de unusuario que exista
      if(!verifyUser(app, idUser)){ // Si devuelve false
        req.logout();  // Deslogueamos al usuario
        res.status(400).json({msg: "User not found."}); // enviamos un mensaje informativo
      }

      const NewComentario = {
          texto: req.body.texto,
          UsuarioId: req.body.UsuarioId,
          LibroId: req.body.LibroId
      }
    
      // if (isNaN(NewComentario.UsuarioId) || isNaN(NewComentario.LibroId)){
      //   res.status(400).json({msg: "El libro o usuario es invalido."});
      // }
      // Definimos una variable para almacenar la transaccion  
      let transaction;
      try {
        // Iniciamos la transaccion
        transaction = await app.db.db.sequelize.transaction();
        // Creamos un comentario
        const resultado =  await Comentarios.create(NewComentario); 
        // Si no hay un error la transaccion se confirma
        await transaction.commit();
        // Devolvemos el comentario creado
        res.status(200).json(resultado); 
      } catch (err) {
        // Si entra en el catch ocurrio un error al guardar el comentario, por lo tanto hacemos rollback
        await transaction.rollback();
        // Devolvemos el error
        res.status(412).json({msg: err.message});
      }
          
    });

    // MODIFICAR UN COMENTARIO
    app.put('/Comentarios/:id/api/v1', verifyToken, isloggedIn, async (req, res) => {

      // Obtenemos el token verificado anteriormente
      const idUser = req.TokenDecodificado;
      // Verificamos que el token verificado anteriormente, sea de unusuario que exista
      if(!verifyUser(app, idUser)){ // Si devuelve false
        req.logout();  // Deslogueamos al usuario
        res.status(400).json({msg: "User not found."}); // enviamos un mensaje informativo
      }

      const EditComentario = {
        texto: req.body.texto
      }
    
      let transaction;
      try {
        transaction = await app.db.db.sequelize.transaction();
        const comentario = await Comentarios.findOne({ where: { id: req.params.id }, attributes: [ 'id', 'texto', 'UsuarioId', 'LibroId' ]}); 
        // vemos si el ususario actual es administrador
        const user = await User.findOne({ where: { email: idUser }}); 
        console.log(comentario.UsuarioId == user.id);
        // Si el id del token es diferente al id que queremos modificar o el usuario no es admin
        if(comentario.UsuarioId != user.id && user.admin == false){
          res.status(400).json({success: false, message: "Action not allowed."}); // enviamos un mensaje informativo
        } else { 
          await Comentarios.update(EditComentario, { where:  { id: req.params.id }}); 
          await transaction.commit();
          res.status(200).json({success: true, message: "File Edited."}); 
        }
      } catch (err) {
        await transaction.rollback();
        res.status(412).json({success: false, message: err.message});
      }
  
    });

    // ELIMINAR UN COMENTARIO
    app.delete('/Comentarios/:id/api/v1', verifyToken, isloggedIn, async (req, res) => {
        
      try { 
        
        // Obtenemos el token verificado anteriormente
        const idUser = req.TokenDecodificado;
        // Verificamos que el token verificado anteriormente, sea de unusuario que exista
        if(!verifyUser(app, idUser)){ // Si devuelve false
          req.logout();  // Deslogueamos al usuario
          res.status(400).json({msg: "User not found."}); // enviamos un mensaje informativo
        }

        const comentario = await Comentarios.findOne({ where: req.params});
        // vemos si el ususario actual es administrador
        const user = await User.findOne({ where: { email: idUser }}); 

        // Si el id del token es diferente al id que queremos modificar o el usuario no es admin
        if(comentario.UsuarioId != user.id && user.admin == false){
          res.status(400).json({success: false, message: "Action not allowed."}); // enviamos un mensaje informativo
        } else {
          // Obtenemos el id de quien escribio el comentario
          const { id } = req.params; 
          await Comentarios.destroy({where: { id }});
          if(deleted == 1){
            res.status(204).json({success: true, message: "File Deleted."});
          } else {
            res.status(412).json({success: false, message: "Data dont found."});
          }
        }

      } catch (error) { 
        res.status(412).json({success: false, message: error.message}); 
      }

    });

    /***********
      CONSULTAS
    ***********/

    // OBTENER TODOS LOS COMENTARIOS 
    app.get('/Comentarios/api/v1', verifyToken, isloggedIn, async (req, res) => {

      try {

        // Obtenemos el token verificado anteriormente
        const idUser = req.TokenDecodificado;
        // Verificamos que el token verificado anteriormente, sea de unusuario que exista
        if(!verifyUser(app, idUser)){ // Si devuelve false
          req.logout();  // Deslogueamos al usuario
          res.status(400).json({success: false, message: "User not found."}); // enviamos un mensaje informativo
        }

        const resultado = await Comentarios.findAll({ limit: 20, order: [['createdAt', 'DESC']], attributes: [ 'id', 'texto', 'createdAt', 'UsuarioId', 'LibroId' ]});
        res.status(200).json(resultado) 
      } catch (error) {
        res.status(412).json({ success: false, message: error.message});
      }
       
    });

    // BUSCAR COMENTARIOS POR USUARIO
    app.get('/ComentariosA/:User/api/v1', verifyToken, isloggedIn ,async (req, res) => {
      try {
        
        // Obtenemos el token verificado anteriormente
        const idUser = req.TokenDecodificado;
        // Verificamos que el token verificado anteriormente, sea de unusuario que exista
        if(!verifyUser(app, idUser)){ // Si devuelve false
          req.logout();  // Deslogueamos al usuario
          res.status(400).json({success: false, message: "User not found."}); // enviamos un mensaje informativo
        }

        const { User } = req.params; 
        const comentario = await Comentarios.findAll({where: { UsuarioId: User}  });
        if(comentario[0] == null){
          res.status(412).json({ success: false, message: "No comentarios found."});
        } else {
          res.status(200).json(comentario);
        } 
      } catch (error) {
        res.status(412).json({ success: false, message: error.message});
      } 
    });

    // BUSCAR COMENTARIOS POR LIBRO
    app.get('/ComentariosL/:Libro/api/v1', verifyToken, isloggedIn, async (req, res) => {
      try {
        
        // Obtenemos el token verificado anteriormente
        const idUser = req.TokenDecodificado;
        // Verificamos que el token verificado anteriormente, sea de unusuario que exista
        if(!verifyUser(app, idUser)){ // Si devuelve false
          req.logout();  // Deslogueamos al usuario
          res.status(400).json({success: false, message: "User not found."}); // enviamos un mensaje informativo
        }

        const { Libro } = req.params; 
        const comentario = await Comentarios.findAll({ order: [['createdAt', 'DESC']], where: { LibroId: Libro} });
        if(comentario[0] == null){
          res.status(412).json({success: false, message: "No data found."});
        } else {
          res.status(200).json(comentario);
        } 
      } catch (error) {
        res.status(412).json({msg: error.message});
      } 
    });
    
}