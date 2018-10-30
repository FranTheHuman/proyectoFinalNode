'use strict'
module.exports = (sequelize, DataType) => {

    const Comentarios = sequelize.define('Comentarios', {
        id: { 
            type: DataType.BIGINT, 
            primaryKey: true,
            autoIncrement: true
        },
        texto: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });
    // Creamos un metodo associate para asociar el modelos con los demas
    Comentarios.associate = (models) => {
        // belongsTo --> Pertenece a tal modelo. 
        // hasMany --> Tiene tantos
        Comentarios.belongsTo(models.Usuarios);
        Comentarios.belongsTo(models.Libros);
    };

    return Comentarios;

}