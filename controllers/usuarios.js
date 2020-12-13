/*
    Route: /api/usuarios'
*/


// UsuarioSchema ->
const Usuario = require('../models/usuario');

// bcrypt encrypted password ->
const bcrypt = require('bcryptjs');
const usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');


// Get All Usuarios ->
const getUsuarios = async ( req, res ) => {

    // Get all the users ->
    const usuarios =  await Usuario.find({}, 'nombre email role google'); 

    res.json({
        ok: true,
        usuarios
    });
    
}


// Crear un Usuario ->
const crearUsuario = async( req, res ) => {

    // Get the body ->
    const { nombre, password, email } = req.body;

    try {
        //Valid the email ->
        const emailExist = await Usuario.findOne({ email: email });

        if( emailExist ) {
            return res.status( 400 ).json({
                ok: false,
                message: 'El correo ya esta registrado'
            });
        }

 
        // Create the obj ->
        const usuario = new Usuario({
            nombre,
            password,
            email
        });

        // Encripto la contraseña ->
        const salt = await bcrypt.genSaltSync();
        usuario.password = await bcrypt.hashSync( password, salt );


        // Save the obj in DB ->
        await usuario.save()

        //Crete a user token ->
        const token = await generarJWT( usuario.id )
    
        res.json({
            ok: true,
            usuario,
            token
        });
        
    } catch ( err ) {

        console.log( err );
        res.status( 500 ).json({
            ok: false,
            message: 'Error inesperado.... revisar logs'
        });

    }

}


const actualizarUsuario = async ( req, res ) => {
    

    const uid =  req.params.id;
    const { nombre, email, role } = req.body;
    try {
        
        const usuarioDB =  await Usuario.findById( uid );

        if( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                message: 'Usuario no encontrado'
            });
        }
        // Actualizaciones ->
        const { password, google, email, ...campos } = req.body;

        if( usuarioDB.email != email ){
            const existeEmail = await Usuario.findOne({ email });

            if( existeEmail ){
                return res.status(404).json({
                    ok: false,
                    message: 'El email ya existe'
                });
            }
        }

        campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true } );

        res.json({
            ok: true,
            usuarioActualizado
        });



    } catch ( err ) {

        console.log( err );
        res.status( 500 ).json({
            ok: false,
            message: 'Error inesperado.... revisar logs'
        });

    }
}

const borrarUsuario = async( req, res ) => {

    const uid =  req.params.id;

    try {
        //Obtengo el usuario a eliminar ->
        const usuarioDB =  await Usuario.findById( uid );

        //Si el usuario no existe devuelvo un error ->
        if( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                message: 'Usuario no encontrado'
            });
        }

        await Usuario.findByIdAndDelete( uid );

        res.json({
            ok: true,
            message: 'Usuario eliminado'
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
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}


