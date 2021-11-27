# API_CITA

***

## Descripción

Esta empresa cuenta con un Director y 5 dentistas, que admiten clientes según la disponibilidad de su agenda. En esta aplicación en el caso del Director, podrá ver tanto los registros de los usuarios, como las citas de diarias. También es el único que puede asignar el Roll de administrador a otro usuario, ya que al hacer un nuevo registro por defecto, se crea un usuario nuevo.

El médico únicamente al estar registrado puede ver sus propias citas, con el cliente que se le ha sido asignado..

El cliente, una vez registrado, puede pedir una cita con un médico siempre y cuando la cita esté libre y además tendrá acceso al historial de citas y podrá hacer una visualización de citas futuras.

***

## Tecnología utilizada

Para el desarrollo de esta aplicación se utiliza como lenguaje JavaScript y una base de datos SQL para una mejor definición y gestión de la misma y consultar y modificar los datos. En cuanto al sistema de gestión nos decantamos por MySQL. La parte gráfica para verificar que lo que añadimos por código no tiene ningún error, y para poder modificar si, es estrictamente necesario desde la misma base de datos, es WordBrench, que nos permite visualizar de una forma más clara, sobre todo de cara a nuestro cliente, todos los datos.

No existiendo un Frontend, para poder comprobar que esta aplicación funciona, requerimos el uso de Postman, un software que permite la interacción con la base de datos para poder simular el registro.

***

## Frameworks

Nos ha ayudado la implementación de distintos Frameworks para conseguir un resultado optimo y mas eficiente de la aplicación:

1- NodeJS: que es un entorno de ejecución multiplataforma.
2-Express: infraestructura de aplicaciones web Node.js mínima y flexible que proporciona un conjunto sólido de características para las aplicaciones web y móviles.
3-JsonWebToken que nos permite la creación de una identidad para que obtenga privilegios.
4- Bcrypt sirve para hacer un hashing de una contraseña .


## Creación de la aplicación.

En la primera parte de este desarrollo, levantamos un servidor en local y creamos una base de  datos para poder comprobar el correcto funcionamiento de la aplicación, migramos el modelo generado y una vez tenemos esto funcional, creamos los archivos del MVC para establecer como vamos a trabajar  y que no haya colapsos a la hora de hacer un push o pull. Este patrón nos da una facilidad para colocar a los usuarios y las fechas y poder organizarlo en tablas para su posterior union.


## Creación de Usuarios

Las acciones que puede hacer una persona al registrarse en esta aplicación van desde un registro inicial, hasta poder pedir una cita. Para ello, hemos utilizado un patrón MVC donde en el controles establecemos las funciones lógicas en el script, como mostramos a continuación:

Creación de usuario:


    try {
        console.log(req.body)
        const newUser = req.body
        newUser.password = hashing.createHash(newUser.password)
        await User.create(newUser)
        res.status(200).json({ user: newUser });
    } catch (error) {
        res.status(400).json({
            message: 'No se ha podido generar un nuevo usuario.',
    });
    }



Log in 



    try {
        let hashDescoted = await hashing.compareHash(req.body)
        console.log(hashDescoted)
        res.status(200).json({ hashDescoted })

    } catch (error) {
        res.json({
            message: 'mail or password denegado.',
            errors: error,
            status: 400
        })
    }

}






## Modelo del usuario.

En esta carpeta se establece el modelo inicial en el que vamos a partir en la base de datos, con los datos necesarios para el registro añadido desde la terminal y migrado a la base de datos



## Rutas de usuario

En este script simplemente unimos las rutas y establecemos los Middleware para el correcto funcionamiento de la aplicación, es la carpeta que hace de union entre los controladores el servidor y la base de datos de la siguiente forma.



router.post('/login',controller.loggin)// logeamos User
router.post('/', middleware.verificarToken,   controller.createUser) // creamos usuario
router.get('/all', controller.searchAll)//busca todos los usario
router.get('/:id', controller.searchUser)//busca por id
router.put('/:put', controller.updateContent)//modificar apellidos
router.delete('/', middleware.verificarToken ,controller.deleteUser)//Eliminar User
module.exports = router;





## Generar citas


Al tener un patrón MVC, los script funcionan de la misma forma que en el usuario, ya que en la parte del controlador establecemos la creación de citas modificación y todo lo que el usuario necesite. Para ello utilizamos los siguientes scripts. 

Modificar las citas




    let modification = req.body
    // let clave=req.params.put
    Appointment.update(modification, {
        where: {
            date: null
        }
    })
        .then((modification) => res.status(200).json({ Data: modification }),
        (error) => { res.status(200), send(error) })





## Buscar una cita



    Appointment.findByPk(req.params.idUser)
        .then((appointment) => {
            if (!appointment) res.status(200).send('La cita no existe.')
            res.status(200).json({ data: Appointment })
        }, (error) => { res.status(400).send(error) })







## Modelo de Citas

En esta parte del patrón requerimos al usuario una fecha para la elección de la cita, esta no debe ser anterior al a la fecha en la que se encuentra y por defecto se establece como pendiente.


    date: DataTypes.STRING,
    state: DataTypes.STRING,
    

    sequelize,
    modelName: 'Appointment',
 

## Ruta de las citas

Este es el scrip que relaciona todos los anteriores mencionados de la siguiente manera:



router.post('/', controller.createAppointment); // Método para crear la cita.
router.get('/all', controller.searchAll); // Método para poder ver todas las citas. (Solo para ADMIN)
router.get('/:idUser', controller.searchAppointment)// Método para buscar las citas por el ID de Usuario.
router.put('/:put', controller.updateAppointment); // Método para modificar la fecha.
router.delete('/', controller.deleteAppointment); // Método para borrar la cita. (Solo para ADMIN)





## Middleware

Aquí damos una creación real de un usuario, generando un token de verficación al hacer un nuevo login. En la primera parte de este archivo encontramos el Hashing de la contraseña, que se realiza en el momento en el que un usuario se registra por primera para darle seguridad a la aplicación de la siguiente forma:



    let encrypted = bcrypt.hashSync(password, 10)
    return encrypted



Una vez creado este Hash queda guardado automáticamente en la base de datos como contraseña, por lo que al hacer de nuevo el login para que no haya ningún conflicto comparamos el hash que crea la contraseña login, con el has guardado en la base de datos y si es el mismo se permite el acceso a la aplicación.

…


    try {
        const project = await User.findOne({ where: { mail: objectUser.mail } });
        if (project === null) {
            return false
        } else {
            let compare = bcrypt.compareSync(objectUser.password, project.password)
            if (compare) {
                const payload = {
                    data: project.id,
                    role: project.role,
                    iat: moment().unix(),
                    exp: moment().add(2, 'days').unix()
                }
                return jwt.sign(payload, process.env.TOKEN)
            }
        }
    } catch (error) {
        res.json({
            message: 'mail or password denegado.',
            errors: error,
            status: 400
        })
    }





Como hemos explicado anteriormente el usuario requiere de un token para poder acceder a la solicitud de una cita que valida que el usuario es real y para verificar este token utilizamos el siguiente código:




    try {
        jwt.verify(req.headers.token, process.env.TOKEN)
        next()
    } catch (error) {
        res.json({ error: 'Acceso denegado, lo siento registrese.' })
    }




