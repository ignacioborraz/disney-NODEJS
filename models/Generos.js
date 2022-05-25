const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../database/db')

const Genero = sequelize.define('Genero', {
    imagen: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pelisSerie: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
});

console.log(Genero === sequelize.models.Genero)