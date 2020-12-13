/*
    Route: /api/login'
*/


// UsuarioSchema ->
const Usuario = require('../models/usuario');

// bcrypt encrypted password ->
const bcrypt = require('bcryptjs');
const usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');


const login = async( req, res ) => {

    const { email, password } = req.body;

    try {
        
        //Obtengo el usuario ->
        const usuarioDB = await Usuario.findOne( { email } ); 
        
        //Si el usuario no existe retorno y termino ->
        if( !usuarioDB ) {
            return res.status(400).json({
                ok: false,
                msg: 'Datos inválidos 1'
            });
        }

        //Verifico la contraseña ->
        const validPassword = await bcrypt.compareSync( password, usuarioDB.password );

        // Si la contraseña no matchea, retorno y termino ->
        if ( !validPassword ){
            return res.status(404).json({
                ok: false,
                msg: 'Datos inválidos 2'
            });
        }

        // genero el token ->
        const token = await generarJWT( usuarioDB.id ); 

        res.json({
            ok: true,
            token
        });


    } catch (error) {
        
        console.log( err );
        res.status( 500 ).json({
            ok: false,
            message: 'Error inesperado.... revisar logs'
        });

    }
}

module.exports = {
    login
}