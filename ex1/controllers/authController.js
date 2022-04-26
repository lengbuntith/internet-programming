const User = require("../models/User");
const jwt = require("jsonwebtoken");
const decoded = require("../services/decodeToken");
const bcrypt = require("bcrypt");

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

  console.log("res handle error", errors);

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
    res.cookie("access_token", token);
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
  let { email, firstName, lastName, password, role } = req.body;

  //not allow user add field 'role'
  if (role) {
    return res.status(500).json({ success: false });
  }

  try {
    //encrypt password
    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);

    //creating user
    const user = await User.create({
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

//get user
const get_user = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
};

//logout account
const logout = (req, res) => {
  res.clearCookie("access_token");
  res.status(200).json({ success: true });
};

//get me
const get_me = async (req, res) => {
  //get token
  const token = req.cookies.access_token;

  //decoded token to get user_id
  jwt.verify(token, "tp13 secret", async (err, decodedToken) => {
    console.log("requireAuth decoded token", decodedToken);
    let user = await User.findById(decodedToken.user_id);
    res.status(200).json({ success: true, data: user });
  });
};

//update user info
const update_user = async (req, res) => {
  //get body
  const body = req.body;
  //get token
  const token = req.cookies.access_token;
  //decode token
  const user = decoded(token);
  console.log("user ", user);

  if (user.success) {
    const doc = await User.findById(user.data.user_id);
    if (body.firstName) doc.firstName = body.firstName;
    if (body.lastName) doc.lastName = body.lastName;
    await doc.save();
    res.status(200).json({ success: true, data: doc });
  }
};

//update account password
const update_password = async (req, res) => {
  try {
    let { password, newPassword } = req.body;

    if (!password) {
      return res.json({ success: false, error: "Password is Required" });
    }

    if (!newPassword) {
      return res.json({ success: false, error: "New password is Required" });
    }

    if (newPassword.length < 8) {
      return res.json({
        success: false,
        error: "Minimum new password is 8 characters",
      });
    }

    //get token
    const token = req.cookies.access_token;
    //decrypt token
    const decrypted = decoded(token);

    if (decrypted.success) {
      //get user info
      const user = await User.findById(decrypted.data.user_id);

      //compare req password with user password
      const auth = await bcrypt.compare(password, user.password);

      //password is matched
      if (auth) {
        //if old and new pass is same not allow to change
        const isSame = await bcrypt.compare(newPassword, user.password);

        if (isSame) {
          return res.json({
            success: false,
            error: "this new password is same with old password",
          });
        }

        //encrypt password
        const salt = await bcrypt.genSalt();
        newPassword = await bcrypt.hash(newPassword, salt);

        user.password = newPassword;
        await user.save();

        res.json({ success: true, data: user });
      } else {
        res.json({ success: false, error: "Incorrect Password" });
      }
    }
  } catch (error) {
    res.json({ success: false, error: error });
  }
};

//delete user account
const delete_user = async (req, res) => {
  const token = req.cookies.access_token;

  const decrypted = decoded(token);

  if (decrypted.success == false) {
    return res.json({ success: false, error: "token is invalid" });
  }

  //delete user
  try {
    const delete_res = await User.deleteOne({ _id: decrypted.data.user_id });
    console.log("delete user", delete_res);

    res.json({ success: true, data: delete_res });
  } catch (error) {
    res.json({ success: false, error: error });
  }
};

//admin login
const admin_login = async (req, res) => {
  const { email, password } = req.body;
  try {
    //user logging...
    const user = await User.login(email, password);

    if (user.role === "admin") {
      //generate token
      const token = createToken(user._id);
      //store cookie
      res.cookie("access_token", token);
      return res.status(200).json({ success: true, data: user });
    } else {
      return res.status(500).json({ success: false });
    }
  } catch (err) {
    console.log("error login", err);
    const error = handleErrors(err);
    res.status(400).json({ success: false, error: error });
  }
};

module.exports = {
  login,
  register,
  get_user,
  logout,
  get_me,
  update_user,
  update_password,
  delete_user,
  admin_login,
};
