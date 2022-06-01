'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Personajes extends Model {
    static associate(models) {
    }
  }
  Personajes.init({
    imagen: DataTypes.STRING,
    nombre: DataTypes.STRING,
    edad: DataTypes.INTEGER,
    peso: DataTypes.INTEGER,
    historia: DataTypes.STRING,
    peliSerie: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Personajes',
  });
  return Personajes;
};