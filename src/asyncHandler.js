module.exports = function asyncHandler(fn) {
  if (typeof fn !== 'function') {
    console.error('asyncHandler ERROR: argumento não é função:', fn);
    throw new TypeError('asyncHandler: argumento não é uma função');
  }

  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
