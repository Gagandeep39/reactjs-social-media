const express = require('express');
const app = express();
const morgan = require('morgan')
const passport = require('passport')
require('dotenv').config()
require('./config/passport')(passport);

// Creating connection logic instance
const connectDB = require('./config/db');
connectDB();

app.use(morgan("dev"));
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
