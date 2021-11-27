const express = require('express');
const {User, Appointment} = require('./models/index')
const appointmentRouter = require('./routers/appointment');
const userRouter = require('./routers/user');
const app = express();
app.use(express.json()); //conversor a codigo JSON: MIDELWARE
const dotenv = require('dotenv').config()

//app.use('/', "holamundo")
app.use('/appointment', appointmentRouter)
app.use('/user', userRouter)


app.listen(process.env.PORT, () => console.log('Funcionando'))
console.log(process.env.PORT)
