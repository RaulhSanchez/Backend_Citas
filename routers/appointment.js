
const router = require('express').Router();
const controller = require('../controllers/appointment.js');
const checkRole = require('../Middleware/decryptoken')
const checkToken = require('../Middleware/functions')


router.get("/user",controller.searchByUser)
router.post('/appointment',controller.createAppointment); // Método para crear la cita.//funciona
router.get('/all',controller.searchAll); // Método para poder ver todas las citas. (Solo para ADMIN) //funciona
router.put('/change',controller.updateAppointment); // Método para modificar la fecha.
router.delete('/delete', controller.deleteOne); // Método para que un usuario elimine todas sus citas
//router.delete('/deleteall', checkToken.verificarToken, controller.deleteAppointment); // Método para que un usuario elimine todas sus citas
router.get('/searchall',checkToken.verificarToken, controller.searchAllPending )

module.exports = router;

