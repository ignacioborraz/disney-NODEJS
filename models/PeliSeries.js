const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../database/db')

const PeliSerie = sequelize.define('PeliSerie', {
    imagen: {
        type: DataTypes.STRING,
        allowNull: false
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genero: {
        type: DataTypes.STRING,
        allowNull: false
    },
    calificacion: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    creacion: {
        type: DataTypes.DATE,
        allowNull: false
    },
    personajes: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
});

console.log(PeliSerie === sequelize.models.PeliSerie)