'use strict'
const {Model,DataTypes} = require('sequelize')
const sequelize = require('../config/sequelize')

class Usuario extends Model {}
Usuario.init({
    nombre: {type: DataTypes.STRING,allowNull: false},
    mail: {type: DataTypes.STRING,allowNull: false},
    contraseña: {type: DataTypes.STRING,allowNull: false},
    claveUnica: {type: DataTypes.STRING,allowNull: false},
    verificacion: {type: DataTypes.BOOLEAN, required:true}
},{
    sequelize,
    modelName: 'Usuario',
    timestamps: false
})

module.exports = Usuario