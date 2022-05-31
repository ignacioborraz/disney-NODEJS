const {DataTypes, Sequelize} = require('sequelize')
const sequelize = require('../server')

const Genero = Sequelize.define('Genero', {
    imagen: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    peliSerie: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
});

console.log(Genero === sequelize.models.Genero)