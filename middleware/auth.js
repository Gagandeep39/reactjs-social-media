/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-08-05 18:12:23
 * @modify date 2020-08-05 18:12:23
 * @desc [description]
 */

const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  // Fetch token from header
  const token = req.header('x-auth-token');
  // Check if token existss
  if (!token) {
    return res.status(401).json({ msg: 'No Token, authorization denied' });
  }
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
