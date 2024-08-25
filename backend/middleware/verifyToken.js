const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.header("authorization");

  if (!authHeader) return res.status(401).send({ message: "Access denied" });

  // Check if the token starts with 'Bearer '
  const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

  if (!token) return res.status(401).send({ message: "Access denied" });

  try {
    const verified = jwt.verify(token, process.env.JWTPRIVATEKEY);
    req.user = verified; // This will include the userId (_id) and other token data
    next();
  } catch (error) {
    res.status(400).send({ message: "Invalid token" });
  }
};

module.exports = verifyToken;
