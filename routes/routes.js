const router = require('express').Router()

const {listarGeneros,unGenero,crearGenero,modificarGenero,eliminarGenero} = require('../controllers/genero')
router.get('/genre', listarGeneros)
router.get('/genre/:id', unGenero)
router.put('/genre/:id', modificarGenero)
router.post('/genre', crearGenero)
router.delete('/genre/:id', eliminarGenero)

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

const {ingresar,registrar,verificarUsuario,verificarToken} = require('../controllers/usuario')
router.post('/auth/login', ingresar)
router.post('/auth/register', registrar)
router.get('/verify/:claveUnica', verificarUsuario)

module.exports = router