const Genero = require("../models/genero")
const Personaje = require("../models/personaje")
const Pelicula = require("../models/pelicula")

Personaje.belongsToMany(Pelicula, {through: "personaje_pelicula"})
Pelicula.belongsToMany(Personaje, {through: "personaje_pelicula"})
Genero.belongsToMany(Pelicula, {through: "genero_pelicula"})
Pelicula.belongsToMany(Genero, {through: "genero_pelicula"})