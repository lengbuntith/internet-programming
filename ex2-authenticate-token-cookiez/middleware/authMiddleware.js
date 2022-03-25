const jwt = require("jsonwebtoken");
const User = require("../models/User");

const requireAuth = (req, res, next) => {
  const token = req.cookies.access_token;
  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, "tp13 secret", (err, decodedToken) => {
      if (err) {
        console.log("requireAuth", err.message);
        res.send({ success: false, error: err.message });
      } else {
        console.log("requireAuth decoded token", decodedToken);
        next();
      }
    });
  } else {
    res.send({ success: false, error: "You need to login first" });
  }
};

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log("middleware token", token);
  if (token) {
    jwt.verify(token, "tp13 secret", async (err, decodedToken) => {
      console.log("decoded", decodedToken);

      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.user_id);
        res.locals.user = user;
        console.log("middleware check user", user);
        res.json({ success: false, error: "This user is signed already" });
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkUser };
