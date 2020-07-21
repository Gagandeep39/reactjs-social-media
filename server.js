// Create a simple express server
const express = require('express');
// Initialize the app variable with express
const app = express();
// Add Endpoints
app.get('/', (req, res) => res.send('API Running'));
// Will look for an envirment variable PORT (During cloud deployment)
// else it will use 5000
const PORT = process.env.PORT || 5000;
// Start the server
app.listen(PORT, () => console.log('Server started on port ' + PORT));
