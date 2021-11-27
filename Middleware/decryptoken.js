const jwt = require("jsonwebtoken");




module.exports.role = (req, res,next) => {
  try {
    console.log(req.headers.token)
    let  objectRole  =  jwt.decode(req.headers.token)
    console.log(objectRole.role)
    if (objectRole.role !== 'admin'){
      res.json({ error: 'A1516515 eres admin.' })
     
    }else{
      console.log('aprobado')
      next()
      console.log('aqui llego?')
    }
  } catch (error) {
    res.json({ error: error })
  }
}

module.exports.decryptoken = (user) => {
  let objectUser = jwt.decode(user)
  console.log(objectUser+'decri')
  return objectUser
}


