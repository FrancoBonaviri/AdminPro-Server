const express = require('express');
require('dotenv').config();
const cors = require('cors');

//DB Connection ->
const { dbConnection } = require('./database/config');

//Creo el server ->
const app = express();


//Inicio la base de datos ->
dbConnection();


//Cors configuration ->
app.use( cors() );

//Route ->
app.get('/', (req, res) => {
    res.json({
        ok: true,
        message: 'Hola mundo'
    });
})



//Start the server ->
app.listen( process.env.PORT , () => {
    console.log('App Running on port ' + process.env.PORT );
})