'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Peliculas extends Model {
    static associate(models) {
    }
  }
  Peliculas.init({
    imagen: DataTypes.STRING,
    titulo: DataTypes.STRING,
    genero: DataTypes.STRING,
    calificacion: DataTypes.INTEGER,
    creacion: DataTypes.DATE,
    personajes: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Peliculas',
  });
  return Peliculas;
};