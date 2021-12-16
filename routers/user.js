const router = require('express').Router()
const controller = require('../controllers/user')
const middleware= require('../Middleware/functions')
const checkRole = require('../Middleware/decryptoken')


router.post('/login',controller.login)// logeamos User
router.post('/register',  controller.createUser) // creamos usuario
router.post('/admin', middleware.verificarToken, checkRole.role, controller.createAdmin)
router.get('/all', middleware.verificarToken,checkRole.role ,controller.searchAll) // Busca todos los usario
router.get('/:id', middleware.verificarToken, controller.searchUser) // Busca por id
router.delete('/', middleware.verificarToken, checkRole.role, controller.deleteUser)//EliminarUser (solo admin)
//router.post('/logout',middleware.logout )



module.exports = router;

