const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../database/db')

const Personaje = sequelize.define('Personaje', {
    imagen: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    edad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    peso: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    historia: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pelisSerie: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
});

console.log(Personaje === sequelize.models.Personaje)