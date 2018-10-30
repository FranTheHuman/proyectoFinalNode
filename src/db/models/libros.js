'use strict'
module.exports = (sequelize, DataType) => {

    const Libros = sequelize.define('Libros', {
        id: { 
            type: DataType.BIGINT, 
            primaryKey: true,
            autoIncrement: true
        },
        titulo: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        autor: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        isbn: {
            type: DataType.STRING,
            allowNull: false, 
            unique: true,
            validate: {
                notEmpty: true
            }
        },
        genero: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        libroImagen: {
            type: DataType.STRING, 
            unique: true  
        }
    });

    Libros.associate = (models) => {
        Libros.hasMany(models.Comentarios);
    };

    return Libros;

}