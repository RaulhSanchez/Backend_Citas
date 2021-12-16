const bcrypt = require('bcrypt');
const redis = require("redis");
const jwToken = require("jsonwebtoken");
const redisClient = redis.createClient();
const JWTR =  require('jwt-redis').default;
const jwtr = new JWTR(redisClient);
const { User, Appointment } = require('../models/index.js')

//generamos el hash para guardar la contraseña encriptada!
const moment = require("moment");
const { default: JWTRedis } = require('jwt-redis');
module.exports.createHash = (password) => {
    let encrypted = bcrypt.hashSync(password, 10)
    return encrypted
}

//function para comparar el hash para guardar la contraseña encriptada!
module.exports.compareHash = async (objectUser) => {
    console.log(objectUser)
    try {
        const project = await User.findOne({ where: { mail: objectUser.mail } });
        console.log(project)
        if (project === null) {
            console.log(project + 'es aquí 2')
            return false
        }         
        if (project) {
            let compare = bcrypt.compareSync(objectUser.password, project.password)
            console.log(compare)
            if (compare) {
                const payload = {
                    data: project.id,
                    role: project.role,
                    iat: moment().unix(),
                    exp: moment().add(1, 'days').unix()
                }
                console.log(process.env.TOKEN)
                return jwToken.sign(payload, process.env.TOKEN)
            }
        }
    } catch (error) {
        console.log(error)
    }
}
//verificaToken
module.exports.verificarToken = (req, res, next) => {
    try {
        const token = req.headers.token
        jwToken.verify(token, process.env.TOKEN)
        next()
    } catch (error) {
        console.log("no es el token bueno")
    }
}

// module.exports.logout = async (req, res) => {
//     try{
//         const token = await req.headers.token
//         console.log(token)
//         if(token){
//              jwtr.destroy(req.headers.token)
//         }else("Error")
//     }catch{
//         console.log("error")
//     }
// }
