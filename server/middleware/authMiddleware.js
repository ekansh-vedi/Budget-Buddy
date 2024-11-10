const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');

  // Check if the Authorization header is present
  if (!authHeader) {
    return res.status(403).json({ msg: 'No token, authorization denied' });
  }

  // Check if the token starts with "Bearer " and extract it
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    return res.status(403).json({ msg: 'Token format is incorrect, authorization denied' });
  }

  try {
    // Verify the token and attach the decoded user information to the request object
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Attach the decoded user to the request
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    // Invalid token
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
