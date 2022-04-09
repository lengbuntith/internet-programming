const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
      validate: [isEmail, "Please enter a valid email"],
    },
    firstName: {
      type: String,
      required: [true, "Please enter a firstName"],
    },
    lastName: {
      type: String,
      required: [true, "Please enter a lastName"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

// static method to login user
userSchema.statics.login = async function (email, password) {
  try {
    const user = await this.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error("incorrect password");
    }
    throw Error("incorrect email");
  } catch (error) {
    let errors = "";
    console.log("User.login", error.message);

    if (error.message.includes("data and hash arguments required")) {
      errors = "Please enter password";
    } else {
      errors = error;
    }
    throw Error(errors);
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
