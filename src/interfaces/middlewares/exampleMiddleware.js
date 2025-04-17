const exampleMiddleware = (req, res, next) => {
  console.log('Example middleware');
  next();
};

export default exampleMiddleware;
