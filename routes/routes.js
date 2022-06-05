const router = require('express').Router()

const {listarGeneros,unGenero,crearGenero,modificarGenero,eliminarGenero} = require('../controllers/genero')
router.get('/genero/listar', listarGeneros)
router.get('/genero/listar/:id', unGenero)
router.put('/genero/modificar/:id', modificarGenero)
router.post('/genero/crear', crearGenero)
router.delete('/genero/eliminar/:id', eliminarGenero)

const {listarPersonajes,unPersonaje,crearPersonaje,modificarPersonaje,eliminarPersonaje} = require('../controllers/personaje')
router.get('/characters', listarPersonajes)
router.get('/characters/:id', unPersonaje)
router.put('/characters/:id', modificarPersonaje)
router.post('/characters/crear', crearPersonaje)
router.delete('/characters/:id', eliminarPersonaje)

const {listarPeliSeries,unaPeliSerie,crearPeliSerie,modificarPeliSerie,eliminarPeliSerie} = require('../controllers/pelicula')
router.get('/movies', listarPeliSeries)
router.get('/movies/:id', unaPeliSerie)
router.put('/movies/:id', modificarPeliSerie)
router.post('/movies', crearPeliSerie)
router.delete('/movies/:id', eliminarPeliSerie)

module.exports = router