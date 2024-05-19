// Import the 'jsonwebtoken' library and define the secret key
const jwt = require("jsonwebtoken");
const secret = "pornhub";

// Function to create an access token
module.exports.createAccessToken = (user) => {
  const data = {
    id: user._id,
    email: user.email,
    isAdmin: user.isAdmin,
  };
  return jwt.sign(data, secret, {});
};

// Middleware for verifying tokens
module.exports.verify = (req, res, next) => {
  console.log(req.headers.authorization);
  let token = req.headers.authorization;

  if (typeof token === "undefined") {
    return res.status(401).json({ auth: "Authorization failed. No token" });
  } else {
    console.log(token);
    token = token.slice(7, token.length);
    console.log(token);

    jwt.verify(token, secret, function (err, decodedToken) {
      if (err) {
        return res.status(401).json({
          auth: "Failed",
          message: err.message,
        });
      } else {
        console.log(decodedToken);

        req.user = decodedToken;
        next();
      }
    });
  }
};

// Middleware for verifying admin privileges
module.exports.verifyAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    return res.status(403).json({
      auth: "Failed",
      message: "Action Forbidden",
    });
  }
};
