require('dotenv').config();
const app = require('./app');
const { connectToDb } = require('./database/index.database');

// function waitForConnection(connection) {
//   return new Promise((resolve, reject) => {
//     connection.once('open', () => {
//       console.log(`Connected to ${connection.name}`);
//       resolve();
//     });
//     connection.once('error', (err) => {
//       console.error(`Connection error on ${connection.name}`, err);
//       reject(err);
//     });
//   });
// }

// (async () => {
//   try {
//     await Promise.all([
//       waitForConnection(userDBConnection),
//       waitForConnection(productDBConnection)
//     ]);
//     const createUserModel = require('./model/user.model');
//     const createProductModel = require('./model/products.model');

//     app.locals.User = createUserModel(userDBConnection);
//     app.locals.Product = createProductModel(productDBConnection);

//     const PORT = process.env.PORT || 3000;
//     app.listen(PORT, () => {
//       console.log(`Server started at port ${PORT}`);
//     });

//   } catch (error) {
//     console.error('Failed to connect to databases', error);
//     process.exit(1);
//   }
// })();


// process.on('SIGINT', async () => {
//   try {
//     await userDBConnection.close();
//     await productDBConnection.close();
//     console.log('MongoDB connections closed');
//   } catch (error) {
//     console.error('Error closing MongoDB connections', error);
//   }
//   process.exit(0);
// });

connectToDb();
app.listen(process.env.PORT,()=>{
    console.log(`Server started on Port`);
})
