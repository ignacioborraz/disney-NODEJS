'use strict'
const {Model,DataTypes} = require('sequelize')
const sequelize = require('../config/sequelize')

class Genero extends Model {}
Genero.init({
    imagen: {type: DataTypes.STRING,allowNull: false},
    nombre: {type: DataTypes.STRING,allowNull: false},
},{
    sequelize,
    modelName: 'Genero',
    timestamps: false
})

module.exports = Genero