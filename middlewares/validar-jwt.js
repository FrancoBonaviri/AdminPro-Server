const jwt = require('jsonwebtoken');


const validarJWT = ( req, res, next ) => {

    //Leer el token ->
    const token = req.header('x-token');

    // si el token no existe, retorno un error ->
    if( !token ) {
        return res.status(401).json({
            ok: false,
            message: 'Token is required' 
        });
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.JWT_SECRET );

        // Si el uid existe, lo guardo en la request asi el controller la obtiene ->
        if ( uid ) {

            req.uid = uid;
            
            // Sigo le ejecucion ->
            next();
        }



    } catch ( error ) {
        
        return res.status(401).json({
            ok: false,
            message: 'Invalid token' 
        });
    
    }

}



module.exports = {
    validarJWT
}
