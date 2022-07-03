const { verifyToken } = require("../helper/tokenmanager")

function adminLogin(req, res, next) {
  let token = req.header('authorization');
  token = token.replace("Bearer ", "")
  if (token) {
    try {
      const result = verifyToken(token);
      if (result.login && result.role === "admin") {
        req.userId = result.id;
        next()
      } else {
        res.status(401).json({
          message: "User is not authorized to perform this operation"
        });
        return;
      }
    } catch (error) {
      res.status(401).json({
        message: error.message || error.error || "User is not authorized to perform this operation"
      });
      return;
    }
  } else {
    res.status(401).json({
      message: "User is not authorized to perform this operation"
    });
    return;
  }
}

function userLogin(req, res, next) {
  let token = req.header('authorization');
  token = token.replace("Bearer ", "")

  if (token) {
    try {
      const result = verifyToken(token);
      if (result.login) {
        req.userId = result.id;
        next()
      }
    } catch (error) {
      res.status(401).json({
        message: error.message || error.error || "User is not authorized to perform this operation"
      });
      return;
    }
  } else {
    res.status(401).json({
      message: "User is not authorized to perform this operation"
    });
    return;
  }
}

module.exports = {
  adminLogin,
  userLogin
}
