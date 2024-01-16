const jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Auth failed' });
  }
};
