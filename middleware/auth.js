const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = await jwt.verify(token, process.env.KEYTOKEN);
    req.userID = decodedToken.userID;
    next();
  } catch {
    res.status(403).json({
      error: 'Log out',
    });
  }
};
