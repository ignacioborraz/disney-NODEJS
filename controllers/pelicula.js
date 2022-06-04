const PeliSerie = require("../models/pelicula")

const peliControllers = {

    listarPeliSeries: async (req,res)=>{
        try {
            let peliSeries = await PeliSerie.findAll()
            return res.status(200).json(peliSeries)
        } catch(error) {
            return res.status(400).json(error)
        }
    },

    unaPeliSerie: async (req,res)=>{
        let id = req.params.id
        try {
            let peliSerie = await PeliSerie.findOne({where: {id:id}})
            return res.status(200).json(peliSerie)
        } catch(error) {
            return res.status(400).json(error)
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