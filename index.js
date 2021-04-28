///////////////////////////////////////////servidor node///////////////////////////////////////////////////////////
//constante http
/* const http = require('http'); */

//const server que usa http.
/* const server = http.createServer((req, res) =>{
    res.status = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello world');
});

server.listen(3000, () => {
    console.log('Serve on post 3000');
}); */

/////////////////////////////////////sevidor con express////////////////////////////////////////////////////////////
//servidor express.
//se guarda módulo express dentro de constante, esa constante se devuelve como objeto app.
//usa el módulo http, es lo mismo de la const http = require8'http');
const express = require('express');
//import morgan
const morgan = require('morgan');
//devuelve objeto como servidor llamadp app
const app = express();

//////////////////////////////////////////SETTINGS/////////////////////////////////////////////////////////////////////
//Llamarlo cuando se inicie el servidor en listener.
app.set('appName', 'Aplicación Tutorial')
app.set('view engine', 'ejs');


/////////////////////////////////////MIDDLEWARE/////////////////////////////////////////////////
//La función del midleware consiste en ejecutar una función antes de meterse a una ruta en específico.
//En otras palabras, sirve para procesar datos antes de que llegue a la ruta.
//función loger MIDDLEWARE. Es un manejador de petición.
//req me toma la información del navegador.

/*
//Función que se usaría como middlware, pero en su lugar se usa morgan midleware.

function logger(req, res, next){
    console.log(`Ruta recibida ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}
*/
//LOS MIDDLEWARE SON IMPORTADOS CON LA PALABRA use
//express entiende formato json
app.use(express.json());
app.use(morgan('dev')); //midleware importado, creado por otra persona, se usa para loggers.
//app.use(logger); se peude usar el propio de node, pero se usó el middleware de morgan.


//función de express, cualquier ruta que tenga /user, va a escribir en consola y escribir finish.
//app.all('/user', (req, res, next) =>{
//    console.log('Por aquí paso');
//    next();
//});

////////////////////////////////////////RUTAS/////////////////////////////////////////////////////

//funcion get app()
//app.get('/',(req, res) => {
//    res.send('PETICIÓN GET RECIBIDA.');
//});
//req, dentro de la función app.función('ruta', (req, res)), toma los datos de la página, osea, son datos que se 
//toman desdesde el navegador.

//llamar el index.ejs de views
app.get('/', (req, res)=>{
    const data = [{name: 'john'}, {name: 'joe'}, {name: 'Raul'}];
    res.render('index.ejs', {gente: data});
});

// al ingresar /user, se obtiene ese json.
//este es llamado no el post.
app.get('/user', (req, res) =>{
    res.json({
        username: 'Cameron',
        lastname: 'Howe'
    });
});

//Probar en POSTMAN
//otro get pero con respuesta json
app.post('/user', (req, res) =>{
    res.json({
        username: 'Cameron',
        lastname: 'Sand'
    });
});

//Probar en POSTMAN
//ruta de about, post, si desea recibir un dato
app.post('/user/:id', (req, res) =>{
    console.log(req.body);
    console.log(req.params);
    res.send('Post request recibed');
});

//Probar en POSTMAN
//ruta de contact, put, para actualizar dato
app.put('/user/:id', (req, res) =>{
    console.log(req.body);
    res.send(`User ${req.params.id} update`);
});

//Probar en POSTMAN
//ruta de test, delete cuando se quiere borrar un datlo
app.delete('/user/:userId', (req, res) =>{
    res.send(`User ${req.params.userId} deleted`);
});


//uso de midleware, para llamar archivos de una carpeta.
app.use(express.static('public'));


////////////////////APP.LISTENER PUERTO 3000//////////////////////////////
//obj app.listener(puerto, función arrow)
//setea el puero y abre conexión a ese puerto con función.
app.listen(3000, ()=>{
    console.log(app.get('appName'));
    console.log('Server on port 3000')
});

//abrir servidor en bash
//node index.js

