const express = require('express');
const dotenv = require('dotenv').config()
const app = express();
const {User, Appointment} = require('./models/index')
const appointmentRouter = require('./routers/appointment');
const userRouter = require('./routers/user');
const petRouter = require("./routers/petRouter")

app.use(function(req, res, next) {    
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json()); 


app.use('/appointment', appointmentRouter)
app.use('/user', userRouter)
app.use("/pet",petRouter)


app.listen(process.env.PORT, () => console.log('Funcionando'))
console.log(process.env.PORT)
