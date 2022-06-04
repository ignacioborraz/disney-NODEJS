const sequelize = require('./config/sequelize')
const Genero = require("./models/genero")
const PeliSerie = require("./models/pelicula")
const Personaje = require("./models/personaje")
require('./config/associations')

sequelize.sync({force: false}).then(async () => {

    let genero1 = await Genero.create({imagen: "imagenGenero1", nombre: "genero1"})
    let genero2 = await Genero.create({imagen: "imagenGenero2", nombre: "genero2"})

    let personaje1 = await Personaje.create({imagen: "imagenPersonaje1", nombre: "personaje1", edad: 20, peso: 5, historia: "historia1"})
    let personaje2 = await Personaje.create({imagen: "imagenPersonaje2", nombre: "personaje2", edad: 21, peso: 6, historia: "historia2"})
    let personaje3 = await Personaje.create({imagen: "imagenPersonaje3", nombre: "personaje3", edad: 30, peso: 7, historia: "historia3"})
    let personaje4 = await Personaje.create({imagen: "imagenPersonaje4", nombre: "personaje4", edad: 31, peso: 8, historia: "historia4"})

    let peliSerie1 = await PeliSerie.create({imagen: "imagenPelicula1", titulo: "pelicula1", calificacion: 5, creacion: 2000-06-09, generoId: 1})
    let peliSerie2 = await PeliSerie.create({imagen: "imagenPelicula2", titulo: "pelicula2", calificacion: 2, creacion: 1997-12-23, generoId: 2})
    let peliSerie3 = await PeliSerie.create({imagen: "imagenPelicula3", titulo: "pelicula3", calificacion: 3, creacion: 1995-02-12, generoId: 1})
    let peliSerie4 = await PeliSerie.create({imagen: "imagenPelicula4", titulo: "pelicula4", calificacion: 4, creacion: 1990-10-17, generoId: 1})

    peliSerie1.addPersonaje([personaje1,personaje2,personaje3,personaje4])
    peliSerie2.addPersonaje([personaje3,personaje4])
    peliSerie3.addPersonaje([personaje1,personaje4])
    peliSerie4.addPersonaje([personaje3])

})