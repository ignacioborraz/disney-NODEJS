const db = require("../models")
const Personaje = db.Personajes

const personajeControllers = {

    listarPersonajes: async (req,res)=>{
        try {
            let personajes = await Personaje.findAll()
            return res.status(200).json(personajes)
        } catch(error) {
            return res.status(400).json(error)
        }
    },

    unPersonaje: async (req,res)=>{
        let id = req.params.id
        try {
            let personaje = await Personaje.findOne({where: {id:id}})
            return res.status(200).json(personaje)
        } catch(error) {
            return res.status(400).json(error)
        }
    },
    
    crearPersonaje: async (req,res)=>{
        let {imagen,nombre,edad,peso,historia,peliSerie} = req.body
        try {
            let nuevoPersonaje = await Personaje.create({imagen,nombre,edad,peso,historia,peliSerie})
            return res.status(201).json(nuevoPersonaje)
        } catch(error) {
            console.log(error)
            return res.status(400).json(error)
        }
    },

    modificarPersonaje: async (req,res)=>{
        let id = req.params.id
        let {imagen,nombre,edad,peso,historia,peliSerie} = req.body
        try {
            let personaje = await Personaje.findOne({where: {id:id}})
            try {
                let personajeModificado = await Personaje.update(req.body, {where: {id:id}})
                personajeModificado = await Personaje.findOne({where: {id:id}})
                return res.status(200).json(personajeModificado)
            } catch(error) {
                return res.status(400).json(error)
            }
        } catch(error) {
            return res.status(400).json(error)
        }
    },

    eliminarPersonaje: async (req,res)=>{
        let id = req.params.id
        try {
            let personaje = await Personaje.findOne({where: {id:id}})
            try {
                let personajeEliminado = await Personaje.destroy({where: {id:id}})
                return res.status(200).json(personaje)
            } catch(error) {
                return res.status(400).json(error)
            }
        } catch(error) {
            return res.status(400).json(error)
        }
    } 

}

module.exports = personajeControllers