const jwt = require("jsonwebtoken");

function createToken(result) {
  const token = jwt.sign(
    { login: true, role: result.role, id: result._id },
    process.env.SECRET,
    {
      expiresIn: "2hr",
    }
  );

  return token
}

function verifyToken(token) {
  try {
    const object = jwt.verify(token, process.env.SECRET);
    return object
  } catch {
    throw new Error("Invalid Token");
  }
}

module.exports = {
  createToken,
  verifyToken
}
