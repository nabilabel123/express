// middlewares/auth.js
const auth = (req, res, next) => {
    // Simulate authentication check (e.g., checking a token or user session)
    if (!req.user) {
      return res.status(401).send('Accès non autorisé. Vous devez être connecté.');
    }
    next();  // Pass control to the next middleware if authenticated
  };
  
  module.exports = auth;
  