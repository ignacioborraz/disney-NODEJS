const db = require("../models")
const Personaje = db.Personaje

const personajeControllers = {

    listarPersonajes: async (req,res)=>{
        try {
            let personajes = await Personaje.findAll({attributes: ['imagen','nombre']})
            console.log(personajes)
            return res.status(200).json(personajes)
        } catch(error) {
            return res.status(500).json(error)
        }
    },

    unPersonaje: async (req,res)=>{
        let id = req.params.id
        try {
            let personaje = await Personaje.findOne({where: {id:id}})
            if (!personaje) {
                return res.status(404).send('no encontrado')
            }
            return res.status(200).json(personaje)
        } catch(error) {
            return res.status(500).json(error)
        }
    },
    
    crearPersonaje: async (req,res)=>{
        let {imagen,nombre,edad,peso,historia,peliSerie} = req.body
        try {
            await Personaje.create({imagen,nombre,edad,peso,historia,peliSerie})
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

module.exports = personajeControllers