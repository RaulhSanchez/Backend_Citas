# API_Veterinario

***

## Descripción

En este proyecto se nos ha pedido hacer una API de una clínica veterinaria, en la que tenemos que facilitar a los usuarios poder registrarse,logearse pedir citas y todas las funciones necesarias para la mayor comodidad del usuario. Para ello hemos tenido la oportunidad de reutilizar una base de datos de otro proyecto, lo que demuestra la escalabilidad de este rpoyecto.

***

## Tecnología utilizada

Para el desarrollo de esta aplicación se utiliza como lenguaje JavaScript y una base de datos SQL para una mejor definición y gestión de la misma y consultar y modificar los datos. En cuanto al sistema de gestión nos decantamos por MySQL. La parte gráfica para verificar que lo que añadimos por código no tiene ningún error, y para poder modificar si, es estrictamente necesario desde la misma base de datos, es WordBrench, que nos permite visualizar de una forma más clara, sobre todo de cara a nuestro cliente, todos los datos.

Antes de desarrollar el Frontend, para poder comprobar que esta aplicación funciona, requerimos el uso de Postman, un software que permite la interacción con la base de datos para poder simular el registro.

***


## Creación de la aplicación.

En la primera parte de este desarrollo, levantamos un servidor en local y creamos una base de  datos para poder comprobar el correcto funcionamiento de la aplicación, migramos el modelo generado y una vez tenemos esto funcional, creamos los archivos siguiendo el patrón MVC para establecer un orden en la logiística de las carpetas y los archivos.Este patrón nos da una facilidad para colocar a las rutas, los modelos y los controloradores como se muestra a continuacion:
![Imagen MVC](https://github.com/RaulhSanchez/Backend_citas/blob/master/MVC.png)


## Creación de Usuarios

Las acciones que puede hacer una persona al registrarse en esta aplicación van desde un registro inicial, hasta poder pedir una cita. Para ello, hemos utilizado un patrón MVC donde en el controles establecemos las funciones lógicas en el script, como mostramos a continuación:

Creación de usuario:


    try {
        const newUser = req.body
        newUser.password = hashing.createHash(newUser.password)
        await User.create(newUser)
        res.status(200).json({ user: newUser });
    } catch (error) {
        res.status(400).json({
            message: 'No se ha podido generar un nuevo usuario.',
    });
    }

En esta mostramos un trozo del código que hemos reutilizado para crear un usuario creando una constante llamada newUser, a la que pasamos unos datos por el body, que son los que nos requiere el modelo previamente creado:


    const newUser = req.body
    
Entre los datos que pasamos requerimos una contraseña, a la que accedemos a traves de "newUser.password" y a traves de una función creada para codificar la contraseña, mantenemos la privacidad del usuario registrado como se puede ver en la siguiente línea de código;


    newUser.password = hashing.createHash(newUser.password)

A continuación añadimos "await" ya que es una funcion asíncrona, lo que quiere decir, en este caso que hasta que la contraseña no este hashseada, no creará al nuevo usuario:


     res.status(200).json({ user: newUser });

Para finalizar si el usuario ha añadido correctamente todos los datos, devolvemos los datos del usuario con la contraseña ya creada en un formato json en el que se encuentra el objeto del nuevo usuario con todos sus datos requeridos.De no ser así entonces la funcioón ira al catch y mostrará un mensaje alertando que no se ha podido generar al usuario.

     res.status(200).json({ user: newUser });
    } catch (error) {
        res.status(400).json({
            message: 'No se ha podido generar un nuevo usuario.',
    });
    }
    
    
    
Finalmente con las rutas creadas en el archivo Routes generamos la conexión que posteriormente necesitará el Frontend para recoger y añadir datos a esta base de datos.
