const Genero = require("../models/genero")
const Personaje = require("../models/personaje")
const Pelicula = require("../models/pelicula")
const Usuario = require("../models/usuario")

Personaje.belongsToMany(Pelicula, {through: "personaje_pelicula"})
Pelicula.belongsToMany(Personaje, {through: "personaje_pelicula"})
Genero.hasMany(Pelicula, {as: "genero", foreignKey: "generoId"})
Pelicula.belongsTo(Genero, {as: "genero"})