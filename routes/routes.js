const router = require('express').Router()
const {crearGenero} = require('../controllers/genControllers')

/* router.get('/', index)
router.get('/pets', listPets)
router.get('/pets/:id', showPetById) */
router.post('/crearGenero', crearGenero)

module.exports = router