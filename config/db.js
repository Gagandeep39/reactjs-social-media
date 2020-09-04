const mongoose = require('mongoose');
const keys = require('../config/keys');
// Cluster -> Select your cluster -> Connect -> Connect your application -> Copy connection string
// Look for key value pair `mongoURI`
const dbUri = keys.mongoURI;

// Async FUnction to Connect to Database
const connectDB = async () => {
  await mongoose
    .connect(dbUri, {
      // Fix Deperication Errors
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // (node:17188) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
      useCreateIndex: true,
    })
    .then((res) => {
      console.log('MOngo DB Connected...');
    })
    .catch((error) => {
      console.error(error.message);
      process.exit(1);
    });
};
// Returns a promise with with we can call the above connection code
// Code is called from server.js
module.exports = connectDB;
