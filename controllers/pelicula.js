const Genero = require("../models/genero")
const Pelicula = require("../models/pelicula")
const Personaje = require("../models/personaje")

const peliControllers = {

    listarPeliSeries: async (req,res)=>{
        try {
            if (req.query.name) {
                let peliculas = await Pelicula.findAll({where: {titulo: req.query.name}, attributes: ['imagen','titulo','creacion'], include: {model: Genero, attributes: ['id','nombre']}})
                return res.status(200).json(peliculas)
            } else if (req.query.genre) {
                let peliculas = await Pelicula.findAll({attributes: ['imagen','titulo','creacion'], include: {model: Genero, attributes: ['id','nombre'], where: {id: req.query.genre}}})
                return res.status(200).json(peliculas)
            } else {
                let peliculas = await Pelicula.findAll({attributes: ['imagen','titulo','creacion']})
                return res.status(200).json(peliculas)
            }
        } catch(error) {
            return res.status(500).json(error)
        }
    },

    unaPeliSerie: async (req,res)=>{
        let id = req.params.id
        try {
            let pelicula = await Pelicula.findOne({
                where: {id:id},
                include: {model: Personaje, attributes: ['imagen','nombre']},
                include: {model: Genero, attributes: ['imagen','nombre']},
            })
            if (!pelicula) {
                return res.status(404).send('no encontrado')
            }
            return res.status(200).json(pelicula)
        } catch(error) {
            return res.status(500).json(error)
        }
    },

    crearPeliSerie: async (req,res)=>{
        let {imagen,titulo,genero,calificacion,creacion,personajes} = req.body
        try {
            let nuevaPeliSerie = await PeliSerie.create({imagen,titulo,genero,calificacion,creacion,personajes})
            return res.status(201).json(nuevaPeliSerie)
        } catch(error) {
            console.log(error)
            return res.status(400).json(error)
        }
    },

    modificarPeliSerie: async (req,res)=>{
        let id = req.params.id
        let {imagen,titulo,genero,calificacion,creacion,personajes} = req.body
        try {
            let peliSerie = await PeliSerie.findOne({where: {id:id}})
            try {
                let peliSerieModificada = await PeliSerie.update(req.body, {where: {id:id}})
                peliSerieModificada = await PeliSerie.findOne({where: {id:id}})
                return res.status(200).json(peliSerieModificada)
            } catch(error) {
                return res.status(400).json(error)
            }
        } catch(error) {
            return res.status(400).json(error)
        }
    },

    eliminarPeliSerie: async (req,res)=>{
        let id = req.params.id
        try {
            let peliSerie = await PeliSerie.findOne({where: {id:id}})
            try {
                let peliSerieEliminada = await PeliSerie.destroy({where: {id:id}})
                return res.status(200).json(peliSerie)
            } catch(error) {
                return res.status(400).json(error)
            }
        } catch(error) {
            return res.status(400).json(error)
        }
    } 

}

module.exports = peliControllers