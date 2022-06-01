const Genero = require("../models/genero")

const generoControllers = {

    crearGenero: async (req,res)=>{
        let {imagen,nombre,peliSerie} = req.body
        try {
            let nuevoGenero = await Genero.create({imagen,nombre,peliSerie})
            return res.status(201).json(nuevoGenero)
        } catch(error) {
            console.log(error)
            return res.status(400).json(error)
        }
    },

/*     listPets: async (req,res)=>{
        try {
            let pets = await Pet.findAll()
            if (pets) {
                let responses = {
                    code: 200,
                    description: "A paged array of pets",
                    content: pets
                }
                return res.status(200).json(responses)
            } else {
                return res.status(404).json({code: 404, message: "null response"})
            }
        } catch(error) {
            return res.status(400).json({code: 400, message: "unexpected error"})
        }
    },

    showPetById: async (req,res)=>{
        let id = req.params.id
        try {
            let pet = await Pet.findOne({where: {id:id}})
            if (pet) {
                let responses = {
                    code: 200,
                    description: "Expected response to a valid request",
                    content: pet
                }
                return res.status(200).json(responses)
            } else {
                return res.status(404).json({code: 404, description: "not found"})
            }
        } catch(error) {
            return res.status(400).json({code: 400, message: "unexpected error"})
        }
    },

    updatePetById: async (req,res)=>{
        let id = req.params.id
        try {
            let pet = await Pet.findOne({where: {id:id}})
            if (pet) {
                await Pet.update(req.body, {where: {id:id}})
                let responses = {
                    code: 201,
                    description: "null response"
                }
                return res.status(201).json(responses)
            } else {
                return res.status(404).json({code: 404, description: "not found"})
            }
        } catch(error) {
            return res.status(400).json({code: 400, message: "unexpected error"})
        }
    },

    deletePetById: async (req,res)=>{
        let id = req.params.id
        try {
            let pet = await Pet.findOne({where: {id:id}})
            if (pet) {
                await Pet.destroy({where: {id:id}})
                let responses = {
                    code: 201,
                    description: "null response"
                }
                return res.status(201).json(responses)
            } else {
                return res.status(404).json({code: 404, description: "not found"})
            }
        } catch(error) {
            return res.status(400).json({code: 400, message: "unexpected error"})
        }
    } */

}

module.exports = generoControllers