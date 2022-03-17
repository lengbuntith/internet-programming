const User = require("../models/User");
const jwt = require("jsonwebtoken");

// handle errors
const handleErrors = (err) => {
  console.log("handleErrors", err.message, err.code);

  let errors = {};

  // incorrect email
  if (err.message.includes("incorrect email")) {
    errors.email = "That email is not registered or incorrect";
  }

  // incorrect password
  if (err.message.includes("incorrect password")) {
    errors.password = "That password is incorrect";
  }

  // required password
  if (err.message.includes("Please enter password")) {
    errors.password = "Password is Required";
  }

  // duplicate email error
  if (err.code === 11000) {
    if (err.keyPattern.email) errors.email = "that email is already registered";
    if (err.keyPattern.username)
      errors.username = "that username is already registered";
  }

  // validation errors
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  console.log("res handleerror", errors);

  return errors;
};

//create token
const createToken = (user_id) => {
  return jwt.sign({ user_id }, "tp13 secret");
};

//login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    //user logging...
    const user = await User.login(email, password);
    //generate token
    const token = createToken(user._id);
    //store cookie
    res.cookie("jwt", token);
    //response data
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    console.log("error login", err);
    const error = handleErrors(err);
    res.status(400).json({ success: false, error: error });
  }
};

//register
const register = async (req, res) => {
  const { username, email, firstName, lastName, password } = req.body;

  try {
    //creating user
    const user = await User.create({
      username,
      email,
      firstName,
      lastName,
      password,
    });
    console.log("register", user);
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    console.log("error register", err);
    const error = handleErrors(err);
    res.status(400).json({ success: false, error: error });
  }
};

module.exports = {
  login,
  register,
};
