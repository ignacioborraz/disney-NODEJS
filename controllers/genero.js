const Genero = require("../models/genero")

const controladorGenero = {

    listarGeneros: async (req,res)=>{
        try {
            let generos = await Genero.findAll()
            return res.status(200).json(generos)
        } catch(error) {
            return res.status(500).json(error)
        }
    },

    unGenero: async (req,res)=>{
        let id = req.params.id
        try {
            let genero = await Genero.findOne({where: {id:id}})
            return res.status(200).json(genero)
        } catch(error) {
            console.log(error)
            return res.status(500).json(error)
        }
    },
    
    crearGenero: async (req,res)=>{
        let {imagen,nombre,peliSerie} = req.body
        try {
            let nuevoGenero = await Genero.create({imagen,nombre})
            return res.status(201).json(nuevoGenero)
        } catch(error) {
            console.log(error)
            return res.status(500).json(error)
        }
    },

    modificarGenero: async (req,res)=>{
        let id = req.params.id
        let {imagen,nombre} = req.body
        try {
            let genero = await Genero.findOne({where: {id:id}})
            try {
                let generoModificado = await Genero.update({imagen,nombre}, {where: {id:id}})
                generoModificado = await Genero.findOne({where: {id:id}})
                return res.status(201).json(generoModificado)
            } catch(error) {
                return res.status(500).json(error)
            }
        } catch(error) {
            console.log(error)
            return res.status(500).json(error)
        }
    },

    eliminarGenero: async (req,res)=>{
        let id = req.params.id
        try {
            let genero = await Genero.findOne({where: {id:id}})
            try {
                await Genero.destroy({where: {id:id}})
                return res.status(201).json(genero)
            } catch(error) {
                console.log(error)
                return res.status(500).json(error)
            }
        } catch(error) {
            console.log(error)
            return res.status(500).json(error)
        }
    } 

}

module.exports = controladorGenero