// Stores Database Connection connect
// Import Mongoose library
const mongoose = require('mongoose');
// Import Config package to to access configs eg. default.json file
const config = require('config');
// Get mongo db instance from config
// Look for key value pair `mongoURI`
// Value is available in MongoDB cloud server
// Cluster -> Select your cluster -> Connect -> Connect your application -> Copy connection string
const db = config.get('mongoURI');

// Async FUnction to Connect to Database
const connectDB = async() => {
    try {
        await mongoose.connect(db, {
            // Fix Deperication Errors
            useNewUrlParser: true,
            useUnifiedTopology: true ,
            // (node:17188) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
            useCreateIndex: true
        });
        console.log('MOngo DB Connected...');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}
// Returns a promise with with we can call the above connection code
// Code is called from server.js
module.exports = connectDB;
