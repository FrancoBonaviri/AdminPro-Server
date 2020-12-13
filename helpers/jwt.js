const jwt = require('jsonwebtoken');


//Esta funcion genera un token para un usuario ->
const generarJWT = ( uid ) => {

    return new Promise( ( resolve, reject ) => {
        
        // payload de data en el JWT ->
        const payload = {
            uid
        };
    
        //Genero el token ->
        jwt.sign( payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, ( err, token ) => {
    
            //Si hay un error, lo disparo ->
            if( err ){
            
                console.log(err);
                reject(' No se pudo generar el JWT ');
            
            } else {
                // devuelvo el token ->
                resolve( token );
            }
        });

    });
}




module.exports = {
    generarJWT
}