/*
    Validacion de los campos del usuario 
*/


const { response } = require('express');
const { validationResult } = require('express-validator');



const validarCampos = ( req, res = response, next ) => {

    //Get the errors ->
    const errores = validationResult( req );

    // If errors exist, return the errors ->
    if( !errores.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }


    //If !errors, continue the request .>
    next();
}

module.exports = validarCampos;

