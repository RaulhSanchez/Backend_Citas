const router = require('express').Router()
const controller = require("../controllers/doctorController")
const middleware = require("../Middleware/functions")

router.get("/all", controller.finDoctor)
router.post("/post", controller.createDoctor)

module.exports = router