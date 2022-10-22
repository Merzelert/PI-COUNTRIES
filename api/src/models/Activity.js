const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo actividad Turistica e
    sequelize.define('activity', {
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        difficulty: {
            type: DataTypes.ENUM("1", "2", "3", "4", "5"),
            allowNull: true,
        },
        duration: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        season: {
            type: DataTypes.ENUM("Summer", "Autumn", "Winter", "Spring"),
            allowNull: true,
        }
    });
};

// ID
// Nombre
// Dificultad (Entre 1 y 5)
// Duración
// Temporada (Verano, Otoño, Invierno o Primavera)