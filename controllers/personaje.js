const Personaje = require("../models/personaje")
const Pelicula = require("../models/pelicula")

const controladorPersonaje = {

    listarPersonajes: async (req,res)=>{
        try {
            if (req.query.name) {
                let personajes = await Personaje.findAll({where: {nombre: req.query.name}, attributes: ['nombre','edad','peso'], include: {model: Pelicula, attributes: ['titulo']}})
                return res.status(200).json(personajes)
            } else if (req.query.age) {
                let personajes = await Personaje.findAll({where: {edad: req.query.age}, attributes: ['nombre','edad','peso'], include: {model: Pelicula, attributes: ['titulo']}})
                return res.status(200).json(personajes)
            } else if (req.query.weight) {
                let personajes = await Personaje.findAll({where: {peso: req.query.weight}, attributes: ['nombre','edad','peso'], include: {model: Pelicula, attributes: ['titulo']}})
                return res.status(200).json(personajes)
            } else if (req.query.movies) {
                let personajes = await Personaje.findAll({attributes: ['nombre','edad','peso'], include: {model: Pelicula, attributes: ['id','titulo'], where: {id: req.query.movies}}})
                return res.status(200).json(personajes)
            } else {
                let personajes = await Personaje.findAll({attributes: ['imagen','nombre']})
                return res.status(200).json(personajes)
            }
        } catch(error) {
            return res.status(500).json(error)
        }
    },

    unPersonaje: async (req,res)=>{
        let id = req.params.id
        try {
            let personaje = await Personaje.findOne({
                where: {id:id},
                include: {model: Pelicula, attributes: ['imagen','titulo']}
            })
            if (!personaje) {
                return res.status(404).send('no encontrado')
            }
            return res.status(200).json(personaje)
        } catch(error) {
            return res.status(500).json(error)
        }
    },
    
    crearPersonaje: async (req,res)=>{
        let {imagen,nombre,edad,peso,historia,Peliculas} = req.body
        try {
            await Personaje.create({imagen,nombre,edad,peso,historia,Peliculas}, {include: "Peliculas"})
            return res.status(201).send('personaje creado')
        } catch(error) {
            console.log(error)
            return res.status(500).json(error)
        }
    },

    modificarPersonaje: async (req,res)=>{
        let id = req.params.id
        let {imagen,nombre,edad,peso,historia,peliSerie} = req.body
        try {
            let personajeModificado = await Personaje.findOne({where: {id:id}})
            if (!personajeModificado) {
                return res.status(404).send('no encontrado')
            } else {
                try {
                    await Personaje.update({imagen,nombre,edad,peso,historia,peliSerie}, {where: {id:id}})
                    return res.status(200).send('personaje modificado')
                } catch(error) {
                    return res.status(500).json(error)
                }
            }
        } catch(error) {
            return res.status(500).json(error)
        }
    },

    eliminarPersonaje: async (req,res)=>{
        let id = req.params.id
        try {
            let personajeAeliminar = await Personaje.findOne({where: {id:id}})
            if (!personajeAeliminar) {
                return res.status(404).send('no encontrado')
            } else {
                try {
                    await Personaje.destroy({where: {id:id}})
                    return res.status(200).send('personaje eliminado')
                } catch(error) {
                    return res.status(500).json(error)
                }
            }
        } catch(error) {
            return res.status(500).json(error)
        }
    }

}

module.exports = controladorPersonaje