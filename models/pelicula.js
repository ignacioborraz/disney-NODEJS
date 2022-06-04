'use strict'
const {Model,DataTypes} = require('sequelize')
const sequelize = require('../config/sequelize')

class Pelicula extends Model {}
Pelicula.init({
    imagen: {type: DataTypes.STRING,allowNull: false},
    titulo: {type: DataTypes.STRING,allowNull: false},
    calificacion: {type: DataTypes.INTEGER,allowNull: false},
    creacion: {type: DataTypes.DATE,allowNull: false}
},{
    sequelize,
    modelName: 'Pelicula',
    timestamps: false
})

module.exports = Pelicula