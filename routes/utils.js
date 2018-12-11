exports.default500Error = function(response, error) {
  console.log(error);
  response.status(500).json({
    error: error
  });
};

/**
 * Вытаскивает token, присланный через <req.headers>. Токен будет доступен по req.token
 * @param req
 * @param res
 * @param next
 */
exports.verifyToken = function(req, res, next) {
  // get auth header value
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    // Set token
    req.token = bearerToken;
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
};
