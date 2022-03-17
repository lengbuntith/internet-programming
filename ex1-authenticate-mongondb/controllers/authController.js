const User = require("../models/User");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });

    console.log(user);

    let msg = "";

    if (user == null)
      msg = { success: false, error: "The user's information is incorrect~" };
    else msg = user;

    res.status(200).json(msg);
  } catch (error) {
    console.log(error);

    res.status(400).json(error);
  }
};

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

    //save document if no any error
    user.save();

    res.status(201).json({ success: true, data: user });
  } catch (error) {
    let msg = "";

    //check duplicate key
    if (error.code == 11000) {
      msg = {
        success: false,
        error: "User is already existed~",
      };
    }

    res.status(400).json(msg);
  }
};

module.exports = {
  login,
  register,
};
