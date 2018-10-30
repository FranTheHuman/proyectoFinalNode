'use strict'

import { verifyTokenAdmin, isloggedInAdmin } from '../libs/auth/index';
import { verifyUser } from '../libs/verifyUserRoutes/index'; 

module.exports = app => {
  
    const Usuarios = app.db.db.models.Usuarios;
    const Libros = app.db.db.models.Libros;  
    const Comentarios = app.db.db.models.Comentarios;

    /***********
      REPORTES
    ***********/

    // 1. OBTENER LOS 10 LIBROS MAS COMENTADOS

    app.get('/LibrosMasComentados/api/v1', isloggedInAdmin, verifyTokenAdmin, async (req, res) => {
        try {
            
            // Obtenemos el token verificado anteriormente
            const idUser = req.TokenDecodificado;
            // Verificamos que el token verificado anteriormente, sea de unusuario que exista
            if(!verifyUser(app, idUser)){
              req.logout();  // Deslogueamos al usuario
              res.status(400).json({ success: false, message: "User not found."}); // enviamos un mensaje informativo
            }

            const resultado = await Comentarios.findAndCountAll({ 
                limit: 10, 
                order: [[app.db.db.sequelize.literal('"Cantidad"') , 'DESC']], 
                include: [
                    {  
                        model: Libros,
                        attributes: ['titulo', 'id']
                    },
                ],
                where: { LibroId: app.db.db.sequelize.literal('"Libro"."id"="Comentarios"."LibroId"') },
                attributes: [ 
                    [app.db.db.sequelize.fn('COUNT', app.db.db.sequelize.col('*')), 'Cantidad'] 
                ],
                group: ['Libro.titulo', 'Libro.id']
            });
                
            res.status(200).json(resultado.rows)

        } catch (error) {
            res.status(400).json(error.message)
        }
    });

    /*s
        SENTENCIA

        SELECT "l"."titulo", COUNT(*)
        FROM public."Libros" as l INNER JOIN public."Comentarios" as c on "l"."id"="c"."LibroId"  
        WHERE "l"."id"="c"."LibroId" 
        GROUP BY "l"."titulo"
        ORDER BY  COUNT(*) desc
        LIMIT 10

    */
    
    // 2. LOS 10 USUARIOS QUE MAS COMENTARIOS HICIERON 

    app.get('/UsuariosMasComentaron/api/v1', isloggedInAdmin, verifyTokenAdmin, async (req, res) => {
        try {
          
            // Obtenemos el token verificado anteriormente
            const idUser = req.TokenDecodificado;
            // Verificamos que el token verificado anteriormente, sea de unusuario que exista
            if(!verifyUser(app, idUser)){
              req.logout();  // Deslogueamos al usuario
              res.status(400).json({ success: false, message: "User not found."}); // enviamos un mensaje informativo
            }

            const resultado = await Comentarios.findAndCountAll({ 
                //limit: 10, 
                order: [[app.db.db.sequelize.literal('"Cantidad"') , 'DESC']], 
                include: [
                    {  
                        model: Usuarios,
                        attributes: ['nombre', 'id']
                    },
                ],
                where: { UsuarioId: app.db.db.sequelize.literal('"Usuario"."id"="Comentarios"."UsuarioId"') },
                attributes: [ 
                    [app.db.db.sequelize.fn('COUNT', app.db.db.sequelize.col('*')), 'Cantidad'] 
                ],
                group: ['Usuario.nombre', 'Usuario.id']
            });
                
            res.status(200).json(resultado.rows)           

        } catch (error) {
            res.status(400).json(error.message)
        }
    });

    /*
        SENTENCIA

        SELECT "u"."nombre", COUNT(*)
        FROM public."Usuarios" as u INNER JOIN public."Comentarios" as c on "u"."id"="c"."UsuarioId"  
        WHERE "u"."id"="c"."UsuarioId" 
        GROUP BY "u"."nombre"
        ORDER BY  COUNT(*) desc
        LIMIT 10

    */

    // 3. TOTAL DE COMENTARIOS

    app.get('/TotalComentarios/api/v1', isloggedInAdmin, verifyTokenAdmin, async (req, res) => {
        try {
           
            // Obtenemos el token verificado anteriormente
            const idUser = req.TokenDecodificado;
            // Verificamos que el token verificado anteriormente, sea de unusuario que exista
            if(!verifyUser(app, idUser)){
              req.logout();  // Deslogueamos al usuario
              res.status(400).json({ success: false, message: "User not found."}); // enviamos un mensaje informativo
            }

            const resultado = await Comentarios.findAndCountAll();
            res.status(200).json(resultado.count)  

        } catch (error) {
            res.status(400).json(error.message)
        }
    });

    /*
        SENTENCIA

        SELECT COUNT(*)
        FROM  public."Comentarios" 

    */

    // 4. TOTAL DE LIBROS

    app.get('/TotalLibros/api/v1', isloggedInAdmin, verifyTokenAdmin, async (req, res) => {
        try {

            // Obtenemos el token verificado anteriormente
            const idUser = req.TokenDecodificado;
            // Verificamos que el token verificado anteriormente, sea de unusuario que exista
            if(!verifyUser(app, idUser)){
              req.logout();  // Deslogueamos al usuario
              res.status(400).json({ success: false, message: "User not found."}); // enviamos un mensaje informativo
            }

            const resultado = await Libros.findAndCountAll();
            res.status(200).json(resultado.count)  
            
        } catch (error) {
            res.status(400).json(error.message)
        }
    });

    /*
        SENTENCIA

        SELECT COUNT(*)
        FROM  public."Libros" 

    */

    // 5. TOTAL DE USUARIOS

    app.get('/TotalUsuarios/api/v1', isloggedInAdmin, verifyTokenAdmin, async (req, res) => {
        try {
           
            // Obtenemos el token verificado anteriormente
            const idUser = req.TokenDecodificado;
            // Verificamos que el token verificado anteriormente, sea de unusuario que exista
            if(!verifyUser(app, idUser)){
              req.logout();  // Deslogueamos al usuario
              res.status(400).json({ success: false, message: "User not found."}); // enviamos un mensaje informativo
            }

            const resultado = await Usuarios.findAndCountAll({where: {admin:false}});
            res.status(200).json(resultado.count)  

        } catch (error) {
            res.status(400).json(error.message)
        }
    });

    /*
        SENTENCIA

        SELECT COUNT(*)
        FROM  public."Usuarios" as u
		WHERE "u"."admin" = false 

    */

    // 6. LOS 10 LIBROS MAS VIEJOS

    app.get('/LibrosMasViejos/api/v1', isloggedInAdmin, verifyTokenAdmin, async (req, res) => {
        try {
            
            // Obtenemos el token verificado anteriormente
            const idUser = req.TokenDecodificado;
            // Verificamos que el token verificado anteriormente, sea de unusuario que exista
            if(!verifyUser(app, idUser)){
              req.logout();  // Deslogueamos al usuario
              res.status(400).json({ success: false, message: "User not found."}); // enviamos un mensaje informativo
            }

            const resultado = await Libros.findAll({ 
                limit: 10, 
                order: [[ 'createdAt' , 'ASC']],   
                attributes: [ "titulo" ], 
            });
                
            res.status(200).json(resultado)

        } catch (error) {
            res.status(400).json(error.message)
        }
    });

    /*
        SENTENCIA

        SELECT "l"."titulo"
        FROM  public."Libros" as l
		ORDER BY "l"."createdAt" ASC
		LIMIT 10

    */

    // 7. LOS 10 LIBROS MAS NUEVOS

    app.get('/LibrosMasNuevos/api/v1', isloggedInAdmin, verifyTokenAdmin, async (req, res) => {
        try {
            
            // Obtenemos el token verificado anteriormente
            const idUser = req.TokenDecodificado;
            // Verificamos que el token verificado anteriormente, sea de unusuario que exista
            if(!verifyUser(app, idUser)){
              req.logout();  // Deslogueamos al usuario
              res.status(400).json({ success: false, message: "User not found."}); // enviamos un mensaje informativo
            }

            const resultado = await Libros.findAll({ 
                limit: 10, 
                order: [[ 'createdAt' , 'DESC']],   
                attributes: [ "titulo" ], 
            });
                
            res.status(200).json(resultado)

        } catch (error) {
            res.status(400).json(error.message)
        }
    });

    /*
        SENTENCIA

        SELECT "l"."titulo"
        FROM  public."Libros" as l
		ORDER BY "l"."createdAt" DESC
		LIMIT 10

    */
 
    // 8. LOS 10 COMENTARIOS MAS VIEJOS 

    app.get('/ComentariosMasViejos/api/v1', isloggedInAdmin, verifyTokenAdmin, async (req, res) => {
        try {
            
            // Obtenemos el token verificado anteriormente
            const idUser = req.TokenDecodificado;
            // Verificamos que el token verificado anteriormente, sea de unusuario que exista
            if(!verifyUser(app, idUser)){
              req.logout();  // Deslogueamos al usuario
              res.status(400).json({ success: false, message: "User not found."}); // enviamos un mensaje informativo
            }

            const resultado = await Comentarios.findAll({ 
                limit: 10, 
                include: [
                    {  
                        model: Libros,
                        attributes: ['titulo']
                    },
                ],
                order: [[ 'createdAt' , 'ASC']],   
                attributes: [ '"Libro"."titulo"', "texto"  ], 
            });
                
            res.status(200).json(resultado)

        } catch (error) {
            res.status(400).json(error.message)
        }
    }); 


    /*
        SENTENCIA

        SELECT  "l"."titulo", "c"."texto"
        FROM  public."Comentarios" as c INNER JOIN public."Libros" as l on "l"."id"="c"."LibroId"  
		ORDER BY "c"."createdAt" ASC
		LIMIT 2

    */

    // 9. CANTIDAD DE USUARIOS BANEADOS

    app.get('/UsuariosBaneados/api/v1', isloggedInAdmin, verifyTokenAdmin, async (req, res) => {
        try {
            
            // Obtenemos el token verificado anteriormente
            const idUser = req.TokenDecodificado;
            // Verificamos que el token verificado anteriormente, sea de unusuario que exista
            if(!verifyUser(app, idUser)){
              req.logout();  // Deslogueamos al usuario
              res.status(400).json({ success: false, message: "User not found."}); // enviamos un mensaje informativo
            }

            const resultado = await Usuarios.findAndCountAll({  
                where: { ban : true } 
            });
                
            res.status(200).json(resultado.count)

        } catch (error) {
            res.status(400).json(error.message)
        }
    });

    /*
        SENTENCIA

        SELECT COUNT(*)
        FROM  public."Usuarios" as u
		WHERE "u"."ban" = true 

    */  
      
}


