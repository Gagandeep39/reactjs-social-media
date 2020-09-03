// Create a simple express server
const express = require('express');
// Initialize the app variable with express
const app = express();

// Creating connection logic instance
const connectDB = require('./config/db');
// Execute the Connection
connectDB();

// Initialize middileware
// Allows accessing request body
app.use(express.json({ extended: false }))

// Add Endpoints
app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/auth', require('./routes/api/auth'));

if(process.env.NOD_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

// Will look for an envirment variable PORT (During cloud deployment)
// else it will use 5000
const PORT = process.env.PORT || 5000;
// Start the server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
