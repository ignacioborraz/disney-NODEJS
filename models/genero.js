'use strict'
const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Genero extends Model {
        static associate(models) {}
    }
    Genero.init({
        imagen: DataTypes.STRING,
        nombre: DataTypes.STRING,
        peliSerie: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Genero',
    })
    return Genero
}