'use strict'

import Sequelize from 'sequelize';
import path from 'path';
import fs from 'fs';
 
let db = null;

module.exports = (app) => {
  // Si la base de datos aun no posee datos 
  if(!db) {
    // Definimos la configuracion dependiendo de el entorno   
    let config = null; 
    if(process.env.NODE_ENV.trim() === "production"){
      config = app.db.config.production; 
    }  else {
      config = app.db.config.development; 
    }
    // Nueva instancia de seuelize con la configuracion
    const sequelize = new Sequelize(
      config.database, // Nombre de la base de datos
      config.username, // Usuario de la base de datos
      config.password, // Contraseña
      {
        dialect: config.dialect, // Que base de datos usamos (mysql, postgresql, oracle, etc)
        operatorsAliases: false, //  Sequelize permite establecer strings específicos como alias para operadores pero Usar Sequelize sin ningún alias mejora la seguridad
        define: { underscore: true }
      },
      config.pool,
      config.host, // El host donde se encuentra la base de daots
      config.params // parametros varios
    );
    // Seteamos a db como un objeto con la instancia de sequelize, sequelize y los modelos aun vacios
    db = {
      sequelize,
      Sequelize,
      models: {}
    };
    
    // File System - Modulo que viene con node 
    // proporciona una API para interactuar con el sistema de archivos de manera cercana a las funciones POSIX estándar
    const dir = path.join(__dirname, 'models'); // Obttenemos el path de la carpeta con los modelos
    // vamos a leer el directorio de modelos asincronamente, me devuelve un arreglo por eso lo vamos a recorrer con foreach
    fs.readdirSync(dir).forEach(filename => { // filename: 1 nombre de archivo por cada recorrido del directorio
      const modelDir = path.join(dir, filename); // obtenemos la ruta del directorio
      const model = sequelize.import(modelDir); // desde sequelize voy a importar cada archivo, cuando sequelize lo lea nos devuelve un modelo de datos
      db.models[model.name] = model; // guardamos ese modelo de datos en los models del objeto db
    });
    
    // Aqui voy a intentar associar los modelos 
    // primero voy a leer los archivos, de los cuales solo voy a querer las claves 
    Object.keys(db.models).forEach(key => {
      db.models[key].associate(db.models); // metodo associate creado en los esquemas
      // ahora los modelos estan relacionados
    });
  }

  return db;
};


/* 
|---------------------------------------------------------------------------------------------------------------------------------------
| POSTGRESQL 
|---------------------------------------------------------------------------------------------------------------------------------------
|
|---------------------------------------------------------------------------------------------------------------------------------------
| SEQUELIZE
|---------------------------------------------------------------------------------------------------------------------------------------
|
|  Cuando hacemos algún desarrollo del lado del backend una de las tareas más comunes que podemos realizar es manipular bases de datos
|  (Insertar, buscar, actualizar, borrar), para esto generalmente se escribe directamente la consulta SQL en el lenguaje de programación 
|  y asi conseguir los datos, un ORM (Object-Relational mapping) nos permite convertir tablas de una base de datos en entidades en un lenguaje 
|  de programación orientado a objetos, lo cual agiliza bastante el acceso a estos datos.
|
|  Sequelize es un ORM para Nodejs que nos permite manipular varias bases de datos SQL de una manera bastante sencilla
|
|
*/