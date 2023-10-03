const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");

const protect = async (req, res, next) => {
  let token;

  // console.log(req.headers.authorization);

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      // console.log(token);

      //decodes token id
      const decoded = jwt.verify(token, "EFHDSNLF");
      console.log(decoded.id);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

module.exports = { protect };
