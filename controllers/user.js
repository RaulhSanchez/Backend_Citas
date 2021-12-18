const { User, Appointment, Pet } = require('../models/index.js')
const { Op, DATE } = require("sequelize")
const hashing = require('../Middleware/functions')
const { Console } = require('console')



module.exports.createUser = async (req, res) => {
    try {
        const newUser = req.body
        newUser.role = 'user'
        newUser.password = hashing.createHash(newUser.password)
        await User.create(newUser)
        res.status(200).json({ user: newUser });
    } catch (error) {
        res.status(400).json({
            message: 'No se ha podido generar un nuevo usuario.',
        });
    }
}
//crear admin
module.exports.createAdmin = async (req, res) => {
    try {
        console.log(req.body)
        const newAdmin = req.body
        newAdmin.password = hashing.createHash(newAdmin.password)
        await Admin.create(newAdmin)
        res.status(200).json({ Admin: newAdmin });
    } catch (error) {
        res.status(400).json({
            message: 'No se ha podido generar un nuevo administrador.',
        });
    }
}
//buscamos Usuario
module.exports.searchUser = (req, res) => {
    try {
        User.findByPk(req.params.id)
            .then((user) => {
                if (!user) res.status(200).send('El usuario no existe')
                res.status(200).json({ data: user })
            })
    } catch (error) {
        res.json({
            message: 'Usuario no encontrado.',
            errors: error,
            status: 400
        })
    }
}
// Buscamos todos los usarios
module.exports.searchAll = async (req, res) => {
    try {
        let listUsers = await User.findAll({})
        console.log(listUsers)
        res.status(200).json({ Data: listUsers })
    } catch (error) {
        res.json({
            message: 'No eres admin.',
            errors: error,
        })
    }
}
//eliminarusario ID
module.exports.deleteUser = async (req, res) => {
    try {
        console.log(req.query)
        let arr = req.query.id
        console.log(arr)
        await User.destroy({
            where: {
                id: arr
            }
        })
        res.status(200).json({ Data: 'el usuario se ha eliminado con exito' })
    } catch (error) {
        res.status(400).send({
            message: 'El usuario no se ha podido eliminar',
            status: 400
        })
    }
}
//login
module.exports.login = async (req, res) => {
    
    try {
        let hashDescoted = await hashing.compareHash(req.body)
        
            res.status(200).json({ hashDescoted })
        
    } catch (error) {
        res.json({
            message: 'mail or password denegado.',
            errors: error,
            status: 400
        })
    }
}

module.exports.loginAdmin = async (req, res) => {
    
    try {
        let hashDescoted = await hashing.compareHashADmin(req.body)
        
            res.status(200).json({ hashDescoted })
        
    } catch (error) {
        res.json({
            message: 'mail or password denegado.',
            errors: error,
            status: 400
        })
    }
}


