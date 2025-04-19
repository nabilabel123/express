// middlewares/logger.js
const logger = (req, res, next) => {
    const { method, url } = req;
    console.log(`${method} ${url}`);
    next();  // Pass control to the next middleware
  };
  
  module.exports = logger;
  