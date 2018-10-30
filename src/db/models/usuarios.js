'use strict'

import bcrypt from 'bcrypt-nodejs';

module.exports = (sequelize, DataType) => {

    const Usuarios = sequelize.define('Usuarios', {
        id: { 
            type: DataType.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        password: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataType.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        admin: {
            type: DataType.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        last_loggin: {
            type: DataType.DATE,
            validate: {
                notEmpty: true
            }
        },
        ban: {
            type: DataType.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }, 
        TiempoBan: {
            type: DataType.DATE,
            allowNull: true, 
        },       
    },
    { 
        freezeTableName: true
    });

    Usuarios.prototype.generateHash = (password) => {       
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    }

    Usuarios.prototype.comparePassword = (password, user) => {
        return bcrypt.compareSync(password, user.password);
    };

    Usuarios.associate = (models) => {
        Usuarios.hasMany(models.Comentarios);
    };
 
    return Usuarios;

}

