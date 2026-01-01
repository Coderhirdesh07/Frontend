const mongoose = require('mongoose');

// const baseUri = process.env.MONGODB_URL;

// const userDBConnection = mongoose.createConnection(`${baseUri}/userDB`);

// const productDBConnection = mongoose.createConnection(`${baseUri}/productDB`);

// userDBConnection.on('connected', () => console.log('Connected to userDB'));
// productDBConnection.on('connected', () => console.log('Connected to productDB'));

// module.exports = {userDBConnection, productDBConnection };

async function connectToDb(){
    try{
      await mongoose.connect(process.env.MONGODB_URL);
      console.log("Database connection success");
    }
    catch(error){
      console.log("Error occured while connecting to database");
    }
}
 module.exports = {connectToDb}
