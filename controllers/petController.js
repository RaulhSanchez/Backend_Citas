const res = require("express/lib/response")
const { User, Appointment, Pet } = require('../models/index.js')
const decrypTuser = require('../Middleware/decryptoken')


module.exports.createPet = async (req,res) => {
    try{
        const user = decrypTuser.decryptoken(req.headers.token)
        const newPet = req.body
        if(user === false){res.send("No estas registrado")}
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

module.exports.getAllPet = async (req,res) => {
    try {
        let user = decrypTuser.decryptoken(req.headers.token)
        let listPet = await Pet.findAll({})
        res.status(200).json({data: listPet})
    } catch (error) {
        console.log("mal")
    }
}

module.exports.getPetByUser = async (req,res) => {
    try{
    let user = decrypTuser.decryptoken(req.headers.token)
    let list = await Pet.find("userId")
    res.status(200).json({data:list})
    }catch{
        console.log("error")
    }
}