'use strict'
const {Model,DataTypes} = require('sequelize')
const sequelize = require('../config/sequelize')

class Personaje extends Model {}
Personaje.init({
    imagen: {type: DataTypes.STRING,allowNull: false},
    nombre: {type: DataTypes.STRING,allowNull: false},
    edad: {type: DataTypes.INTEGER,allowNull: false},
    peso: {type: DataTypes.INTEGER,allowNull: false},
    historia: {type: DataTypes.STRING,allowNull: false}
},{
    sequelize,
    modelName: 'Personaje',
    timestamps: false
})

module.exports = Personaje