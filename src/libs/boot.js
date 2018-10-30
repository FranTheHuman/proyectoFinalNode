'use strcit'

module.exports = (app) => {

    // Inicializacion del servidor en express

    //app.db.db.sequelize.sync().done : ejecuta el modelo de base de datos para verificar que siemrpe existan las tablas
    app.db.db.sequelize.sync().done(() => {
        // Inicializamos el servidor en el puerto que viene configurado y mostramos un mensaje q nos anuncie que el servidor esta corriendo
        app.listen(app.get('port'), ()=>{console.log(`
            *****************************************
            # Server listen on port ${app.get('port')} 
            ***************************************** 
        `)})
    }) 
    
}

