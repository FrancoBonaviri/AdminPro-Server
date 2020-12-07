const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        
        
        const connection = await mongoose.connect( process.env.DB_CNN , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });

        console.log('Base de datos online');


    } catch ( err ) {
        console.log(err);
        throw new Error('Error a la hora de iniciar la BD. Ver logs');
    }

};

module.exports = {
    dbConnection
}