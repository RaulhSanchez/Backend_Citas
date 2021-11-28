const res = require("express/lib/response")
const { User, Appointment, Pet } = require('../models/index.js')
const decrypTuser = require('../Middleware/decryptoken')

module.exports.createPet = async (req,res) => {
    try {
        const newPet = req.body
        await Pet.create(newPet)
        res.status(200).json({pet:newPet})
    } catch (error) {
        res.status(400).json({mensaje:"mal"})
    }
}

module.exports.createPet = async (req,res) => {
    try{
        const user = User
        const newPet = req.body
        if(user === false){res.send("mal")}
        else{
            let respond = await Pet.create({
                name: newPet.name,
                mascota: newPet.mascota,
                userId: user.data
            })
            res.status(200).json({data:respond})
        }
    }catch{
        res.send("error")
    }
}