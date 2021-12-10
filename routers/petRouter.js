const router = require('express').Router()
const controller = require("../controllers/petController")
const middleware= require('../Middleware/functions')
const checkRole = require('../Middleware/decryptoken')

router.post("/create",controller.createPet) // crear mascota
router.get("/user", controller.getPetByUser)
router.get("/all",controller.getAllPet)// Buscar mascota

module.exports =router;