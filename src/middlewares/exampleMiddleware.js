const exampleMiddleware = (req, res, next) => {
  console.log('Example middleware');
  next();
};

module.exports = exampleMiddleware;
