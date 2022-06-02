const router = require('express').Router()
const {listarGeneros,unGenero,crearGenero,modificarGenero,eliminarGenero} = require('../controllers/genControllers')

router.get('/genero/listar', listarGeneros)
router.get('/genero/listar/:id', unGenero)
router.put('/genero/modificar/:id', modificarGenero)
router.post('/genero/crear', crearGenero)
router.delete('/genero/eliminar/:id', eliminarGenero)

module.exports = router