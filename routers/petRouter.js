const router = require('express').Router()
const controller = require("../controllers/petController")

router.post("/create",controller.createPet) // crear mascota
router.get("/user",controller.getPetByUser)
router.get("/all",controller.getAllPet)// Buscar mascota

module.exports =router;