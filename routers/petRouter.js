const router = require('express').Router()
const controller = require("../controllers/petController")

router.post("/create",controller.createPet) // crear mascota

module.exports =router;