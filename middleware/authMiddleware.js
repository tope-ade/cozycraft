
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const header = req.header('Authorization');
    if (!header)
      return res.status(401).json({
      message : 'No token provided'
    });

    const token = header.split(' ')[1]; //'Bearer <token>'
    req.user = decoded
    next();

  } catch (err) {
    return res.status(401).json({
      message : 'Token not found'
    });
  }
};
