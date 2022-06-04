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
router.put('/characters/modificar/:id', modificarPersonaje)
router.post('/characters/crear', crearPersonaje)
router.delete('/characters/eliminar/:id', eliminarPersonaje)

const {listarPeliSeries,unaPeliSerie,crearPeliSerie,modificarPeliSerie,eliminarPeliSerie} = require('../controllers/pelicula')
router.get('/peliSerie/listar', listarPeliSeries)
router.get('/peliSerie/listar/:id', unaPeliSerie)
router.put('/peliSerie/modificar/:id', modificarPeliSerie)
router.post('/peliSerie/crear', crearPeliSerie)
router.delete('/peliSerie/eliminar/:id', eliminarPeliSerie)

module.exports = router