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

// Letura - parseo del body ->
app.use( express.json() );

//Routes ->
app.use( '/api/usuarios' , require( './routes/usuarios' ));
app.use( '/api/login' , require( './routes/auth' ));



//Start the server ->
app.listen( process.env.PORT , () => {
    console.log('App Running on port ' + process.env.PORT );
})