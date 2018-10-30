'use strict'

//Modulos -> Configraciones
import { verifyToken, verifyTokenAdmin, isloggedIn, isloggedInAdmin } from '../libs/auth/index';
import { verifyUser } from '../libs/verifyUserRoutes/index';
import validator from '../libs/Validators/index';
// Multer Middleware
import upload from '../libs/storeFilesStrategy/index';
//Modulo Cloudinary para almacenar las imagenes que el usuario suba en la nube
import cloudinary from 'cloudinary';

// Configuramos Cloudinary
cloudinary.config({ cloud_name: process.env.CLOUD_NAME, api_key: process.env.API_KEY, api_secret: process.env.API_SECRET }); 

module.exports = app => { 

    const Libros = app.db.db.models.Libros;  

    /***********
        ABM
    ***********/

    // CREAR NUEVO LIBRO
    app.post('/Libros/api/v1', isloggedInAdmin, verifyTokenAdmin, async (req, res) => { 
      // Obtenemos el token verificado anteriormente
      const idUser = req.TokenDecodificado;
      // Verificamos que el token verificado anteriormente, sea de unusuario que exista
      if(!verifyUser(app, idUser)){
        req.logout();  // Deslogueamos al usuario
        res.status(400).json({ success: false, message: "User not found."}); // enviamos un mensaje informativo
      }   
      // Creamos un nuevo libro
      let NewLibro = {
        titulo: validator.MaysPrimera(req.body.titulo.replace(/\s+/gi,' ').trim()),
        autor: validator.MaysPrimera(req.body.autor.replace(/\s+/gi,' ').trim()),
        isbn: validator.MaysPrimera(req.body.isbn.replace(/\s+/gi,'').trim()),
        genero: validator.MaysPrimera(req.body.genero.replace(/\s+/gi,' ').trim()) 
      }
      // Validamos los datos
      if (!validator.verificarTitulo(NewLibro.titulo)){
        res.status(400).json({ success: false, message: "El formato del titulo es incorrecto."});
      }
      if (!validator.verificarAutor(NewLibro.autor)){
        res.status(400).json({ success: false, message: "El formato del autor es incorrecto."});
      }
      if (!validator.verificarIsbn(NewLibro.isbn)){
        res.status(400).json({ success: false, message: "El formato del isbn es incorrecto."});
      }
      if (!validator.verificarGenero(NewLibro.genero)){
        res.status(400).json({ success: false, message: "El formato del genero es incorrecto."});
      }
      try { 

        //Definimos una variable para almacenar la transaccion  
        let transaction;
        try {
          // Iniciamos la transaccion
          transaction = await app.db.db.sequelize.transaction();
          // Creamos un Libro
          const resultado =  await Libros.create(NewLibro); 
          // Si no hay un error la transaccion se confirma
          await transaction.commit();
          // Devolvemos el comentario creado
          res.status(200).json(resultado); 
        } catch (err) {
          // Si entra en el catch ocurrio un error al guardar el libro, por lo tanto hacemos rollback y evitamos posibles cambios inseguros
          await transaction.rollback();
          // Devolvemos el error
          res.status(412).json({ success: false, message: err.message});
        }
      } catch (error) {
        res.status(412).json({ success: false, message: error.message});
      } 
    });

    // MODIFICAR UN LIBRO
    app.put('/Libros/:id/api/v1', isloggedInAdmin, verifyTokenAdmin, async (req, res) => {

      // Obtenemos el token verificado anteriormente
      const idUser = req.TokenDecodificado;
      // Verificamos que el token verificado anteriormente, sea de unusuario que exista
      if(!verifyUser(app, idUser)){
        req.logout();  // Deslogueamos al usuario
        res.status(400).json({ success: false, message: "User not found."}); // enviamos un mensaje informativo
      }
      
      // Creamos un nuevo libro
      const EditLibro = {
        titulo: validator.MaysPrimera(req.body.titulo.replace(/\s+/gi,' ').trim()),
        autor: validator.MaysPrimera(req.body.autor.replace(/\s+/gi,' ').trim()),
        isbn: validator.MaysPrimera(req.body.isbn.replace(/\s+/gi,'').trim()),
        genero: validator.MaysPrimera(req.body.genero.replace(/\s+/gi,' ').trim())
      }
      // Validamos los datos
      if (!validator.verificarTitulo(EditLibro.titulo)){
        res.status(400).json({ success: false, message: "El formato del titulo es incorrecto."});
      }
      if (!validator.verificarAutor(EditLibro.autor)){
        res.status(400).json({ success: false, message: "El formato del autor es incorrecto."});
      }
      if (!validator.verificarIsbn(EditLibro.isbn)){
        res.status(400).json({ success: false, message: "El formato del isbn es incorrecto."});
      }
      if (!validator.verificarGenero(EditLibro.genero)){
        res.status(400).json({ success: false, message: "El formato del genero es incorrecto."});
      }  

      let transaction;
      try {

        transaction = await app.db.db.sequelize.transaction();
        await Libros.update(EditLibro, { where: req.params }); 
        await transaction.commit();
        res.status(200).json({ msg: "File Edited."}); 

      } catch (err) {
        await transaction.rollback();
        res.status(412).json({ success: false, message: err.message});
      }

    });

    // MODIFICAR LIBRO PARA GUARDAR IMAGEN
    app.put('/LibroImage/:isbn/api/v1', upload.single('libroImage'), isloggedInAdmin, verifyTokenAdmin, async (req, res) => {

      // Obtenemos el token verificado anteriormente
      const idUser = req.TokenDecodificado;
      // Verificamos que el token verificado anteriormente, sea de unusuario que exista
      if(!verifyUser(app, idUser)){
        req.logout();  // Deslogueamos al usuario
        res.status(400).json({ success: false, message: "User not found."}); // enviamos un mensaje informativo
      }
       
      if (!validator.verificarIsbn(req.params.isbn)){
        res.status(400).json({ success: false, message: "El formato del isbn es incorrecto."});
      } 
      // Validamos que se haya subido una imagen
      if(req.file == undefined){
        res.status(400).json({ success: false, message: "El libro debe poseer una imagen representativa png o jpg."}); // enviamos un mensaje informativo
        await Libros.destroy({ where: { isbn: req.params.isbn} });
      }
      
      let transaction;
      try {
        // Subimos a cloudinary la imagen del libro  de manera asincrona
        const resultImgen = await cloudinary.v2.uploader.upload(req.file.path);   

        transaction = await app.db.db.sequelize.transaction();
        await Libros.update({libroImagen: resultImgen.url}, { where: { isbn: req.params.isbn} }); 
        await transaction.commit();
        res.status(200).json({ msg: "File Edited."}); 

      } catch (err) {
        await transaction.rollback();
        await Libros.destroy({ where: { isbn: req.params.isbn} }); 
        res.status(412).json({ success: false, message: err.message});
      }

    });

    // ELIMINAR UN LIBRO
    app.delete('/Libros/:isbn/api/v1', isloggedInAdmin, verifyTokenAdmin, async (req, res) => {
      
      let transaction;
      try { 
        transaction = await app.db.db.sequelize.transaction();
        // Obtenemos el token verificado anteriormente
        const idUser = req.TokenDecodificado;
        // Verificamos que el token verificado anteriormente, sea de unusuario que exista
        if(!verifyUser(app, idUser)){
          req.logout();  // Deslogueamos al usuario
          res.status(400).json({ success: false, message: "User not found."}); // enviamos un mensaje informativo
        }

        const { isbn } = req.params;  
        if (!validator.verificarIsbn(isbn.replace(/\s+/gi,'').trim())){
          res.status(400).json({ success: false, message: "El formato del isbn es incorrecto."});
        } else {
          await Libros.destroy({where: { isbn }});
          await transaction.commit();
          res.status(200).json({ msg: "File Deleted."}); 
        }
      } catch (error) { 
        await transaction.rollback();
        res.status(412).json({ success: false, message: error.message}); 
      }

    });

    /***********
      CONSULTAS
    ***********/

    // OBTENER TODOS LOS LIBROS
    app.get('/Libros/api/v1', verifyToken,  isloggedIn, async (req, res) => { 

      try {

        // Obtenemos el token verificado anteriormente
        const idUser = req.TokenDecodificado;
        // Verificamos que el token verificado anteriormente, sea de unusuario que exista
        if(!verifyUser(app, idUser)){
          req.logout();  // Deslogueamos al usuario
          res.status(400).json({msg: "User not found."}); // enviamos un mensaje informativo
        }

        // Buscamos todos los libros ordenados por titulo
        const result = await Libros.findAll({ order: [ 'titulo' ], attributes: [ 'id', 'titulo', 'isbn', 'genero', 'autor', 'libroImagen' ]} );
        res.status(200).json(result);
      } catch (error) {
        res.status(412).json({msg: error.message});
      }
      
    });

    // OBTENER LIBROS - PAGINACION
    app.get('/LibrosPaginacion/:page/api/v1', verifyToken,  isloggedIn, async (req, res) => { 

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
        const result = await Libros.findAndCountAll({limit: perPage, offset: (perPage * page) - perPage, order: [ 'titulo' ], attributes: [ 'id', 'titulo', 'isbn', 'genero', 'autor', 'libroImagen' ]}); 
        const respuesta = {libros: result.rows, current: page, pages: Math.ceil(result.count / perPage)};

        res.status(200).json(respuesta);
      } catch (error) {
        res.status(412).json({ success: false, message: error.message});
      }
      
    });

    // BUSCAR LIBROS POR PARAMETRO DECONOCIDO
    app.get('/Libros/:parametro/api/v1', verifyToken, isloggedIn, async (req, res) => {

      try {
        
        // Obtenemos el token verificado anteriormente
        const idUser = req.TokenDecodificado;
        // Verificamos que el token verificado anteriormente, sea de unusuario que exista
        if(!verifyUser(app, idUser)){
          req.logout();  // Deslogueamos al usuario
          res.status(400).json({success: false, message: "User not found."}); // enviamos un mensaje informativo
        }   

        const { parametro } = req.params;
        // Si ninguna de las condiciones se cumple no es un dato valido
        if (!validator.verificarIsbn(parametro.replace(/\s+/gi,'').trim()) && !validator.verificarTitulo(parametro.replace(/\s+/gi,' ').trim()) && !validator.verificarGenero(parametro.replace(/\s+/gi,' ').trim()) && !validator.verificarAutor(parametro.replace(/\s+/gi,' ').trim())){
          res.status(400).json({ success: false, message: "El formato del parametro de busqueda es incorrecto."});
        } else {
          const titulo = await Libros.findAll({where: { titulo: `${validator.MaysPrimera(parametro.replace(/\s+/gi,' ').trim())}`  }, order: [ 'titulo' ], attributes: [ 'id', 'titulo', 'isbn', 'genero', 'autor' ]});
          if(titulo.length === 0){
             const isbn = await Libros.findAll({where: { isbn: parametro }});
             if(isbn.length === 0){
               const autor = await Libros.findAll({where: { autor: validator.MaysPrimera(parametro.replace(/\s+/gi,' ').trim()) }});  
               if(autor.length === 0){
                 const genero = await Libros.findAll({where: { genero: validator.MaysPrimera(parametro.replace(/\s+/gi,' ').trim()) }});
                  if(genero.length === 0){
                    res.status(412).json({success: false, message: "No data found."});
                  } else {
                    res.status(200).json(genero);
                  }
               } else { 
                res.status(200).json(autor);
               }
             } else {
              res.status(200).json(isbn);
            }
          } else {
            res.status(200).json(titulo);
          } 
        } 
      } catch (error) {
        res.status(412).json({success: false, message: error.message});
      }

    });

    // BUSCAR LIBRO POR ID
    app.get('/LibrosId/:id/api/v1', verifyToken, isloggedIn, async (req, res) => {

      try {
        
        // Obtenemos el token verificado anteriormente
        const idUser = req.TokenDecodificado;
        // Verificamos que el token verificado anteriormente, sea de unusuario que exista
        if(!verifyUser(app, idUser)){
          req.logout();  // Deslogueamos al usuario
          res.status(400).json({success: false, message: "User not found."}); // enviamos un mensaje informativo
        }   

        const { id } = req.params;
        
        const libro = await Libros.findAll({where: { id  }, order: [ 'titulo' ], attributes: [ 'id', 'titulo', 'isbn', 'genero', 'autor' ]});
        if(libro.length === 0){
            res.status(412).json({success: false, message: "No Libro found."});
        } else {
          res.status(200).json(libro);
        } 
      } catch (error) {
        res.status(412).json({success: false, message: error.message});
      }

    });    

    // BUSCAR LIBROS POR TITULO
    app.get('/LibrosTITULO/:TITULO/api/v1', verifyToken, isloggedIn, async (req, res) => {
      try {

        // Obtenemos el token verificado anteriormente
        const idUser = req.TokenDecodificado;
        // Verificamos que el token verificado anteriormente, sea de unusuario que exista
        if(!verifyUser(app, idUser)){
          req.logout();  // Deslogueamos al usuario
          res.status(400).json({msg: "User not found."}); // enviamos un mensaje informativo
        }

        const { TITULO } = req.params; 
        const titulo = await Libros.findAll({where: { titulo: { $like: `%${TITULO}%` } }, order: [ 'titulo' ], attributes: [ 'titulo', 'isbn', 'genero', 'autor' ]});
        if(titulo[0] == null){
          res.status(412).json({msg: "No data found."});
        } else {
          res.status(200).json(titulo);
        } 
      } catch (error) {
        res.status(412).json({msg: error.message});
      }
    });

    // BUSCAR LIBROS POR ISBN
    app.get('/LibrosISBN/:ISBN/api/v1', verifyToken, isloggedIn, async (req, res) => {
      
      try { 

        
        // Obtenemos el token verificado anteriormente
        const idUser = req.TokenDecodificado;
        // Verificamos que el token verificado anteriormente, sea de unusuario que exista
        if(!verifyUser(app, idUser)){
          req.logout();  // Deslogueamos al usuario
          res.status(400).json({msg: "User not found."}); // enviamos un mensaje informativo
        }

        const { ISBN } = req.params; 
        const isbn = await Libros.findAll({where: { isbn: { $like: `${ISBN}%` } }, order: [ 'titulo' ], attributes: [ 'titulo', 'isbn', 'genero', 'autor' ]}); 
        if(isbn[0] == null){
          res.status(412).json({msg: "No data found."});
        } else {
          res.status(200).json(isbn);
        } 
      } catch (error) {
        res.status(412).json({msg: error.message});
      }
    });

    // BUSCAR LIBROS POR AUTOR
    app.get('/LibrosAUTOR/:AUTOR/api/v1', verifyToken, isloggedIn, async (req, res) => {
      
      try { 

        // Obtenemos el token verificado anteriormente
        const idUser = req.TokenDecodificado;
        // Verificamos que el token verificado anteriormente, sea de unusuario que exista
        if(!verifyUser(app, idUser)){
          req.logout();  // Deslogueamos al usuario
          res.status(400).json({msg: "User not found."}); // enviamos un mensaje informativo
        }        

        const { AUTOR } = req.params;
        const autor = await Libros.findAll({where: { autor: { $like: `%${AUTOR}%` } }, order: [ 'titulo' ], attributes: [ 'titulo', 'isbn', 'genero', 'autor' ]});  
        if(autor[0] == null){
          res.status(412).json({msg: "No data found."});
        } else {
          res.status(200).json(autor);
        } 
      } catch (error) {
        res.status(412).json({msg: error.message});
      }
    });
    
    // BUSCAR LIBROS POR GENERO
    app.get('/LibrosGENERO/:GENERO/api/v1', verifyToken, isloggedIn, async (req, res) => {
      
      try { 

        
        // Obtenemos el token verificado anteriormente
        const idUser = req.TokenDecodificado;
        // Verificamos que el token verificado anteriormente, sea de unusuario que exista
        if(!verifyUser(app, idUser)){
          req.logout();  // Deslogueamos al usuario
          res.status(400).json({msg: "User not found."}); // enviamos un mensaje informativo
        }

        const { GENERO } = req.params;
        const genero = await Libros.findAll({where: { genero: { $like: `%${GENERO}%` } }, order: [ 'titulo' ], attributes: [ 'titulo', 'isbn', 'genero', 'autor' ]});   
        console.log(genero);
        if(genero[0] == null){
          res.status(412).json({msg: "No data found."});
        } else {
          res.status(200).json(genero);
        } 
      } catch (error) {
        res.status(412).json({msg: error.message});
      }
    });
    

}




  
  

 
 