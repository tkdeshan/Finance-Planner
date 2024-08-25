const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send({ message: 'Access denied' });

  try {
    const verified = jwt.verify(token, process.env.JWTPRIVATEKEY);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send({ message: 'Invalid token' });
  }
};

module.exports = verifyToken;
