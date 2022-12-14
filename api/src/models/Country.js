const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo pais e
    sequelize.define('country', {
        id: {
            type: DataTypes.STRING(3),
            primaryKey: true,
            unique: true,
            allowNull: false, // no se permite el campo vacio, es requerido  
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false, // no se permite el campo vacio, es requerido 
        },
        imagenBandera: {
            type: DataTypes.STRING,
            allowNull: false, // no se permite el campo vacio, es requerido 
        },
        continente: {
            type: DataTypes.STRING,
            allowNull: false, // no se permite el campo vacio, es requerido 
        },
        capital: {
            type: DataTypes.STRING,
            allowNull: false, // no se permite el campo vacio, es requerido 
        },
        subregion: {
            type: DataTypes.STRING,
        },
        area: {
            type: DataTypes.INTEGER,
        },
        poblacion: {
            type: DataTypes.INTEGER,
        },
    }, {
        timestamps: false,
    });
};


// ID (Código de 3 letras) *
// Nombre *
// Imagen de la bandera *
// Continente *
// Capital *
// Subregión
// Área
// Población