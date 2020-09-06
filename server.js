const express = require('express');
const app = express();
const morgan = require('morgan');
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
require('dotenv').config();
require('./config/passport')(passport);

// Creating connection logic instance
const connectDB = require('./config/db');
connectDB();
const options = {
  definition: {
    openapi: '3.0.0', // Specification (optional, defaults to swagger: '2.0')
    info: {
      title: 'Social Media API', // Title (required)
      version: '1.0.0', // Version (required)
      description: 'Dev Connect application Docs',
      contact: {
        name: 'Gagandeep Singh',
      },
      servers: ['http://localhost:5000'],
    },
  },
  apis: ['./routes/docs/*.yml'],
};

const swaggerDocs = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(express.json({ extended: false }));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

if (process.env.NOD_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
