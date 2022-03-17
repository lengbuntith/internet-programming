const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const User = require("./models/User");

const { requireAuth, checkUser } = require("./middleware/authMiddleware");

const app = express();
const port = 3001;

//middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
//connect mongoDB
const uri = "mongodb://localhost:27017/tp09";
mongoose
  .connect(uri)
  .then((result) => app.listen(port))
  .catch((err) => console.log(err));

//routes

app.get("/user/:id", requireAuth, async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
});

app.get("/logout", (req, res) => {
  res.cookie("jwt", "");
  res.status(200).json({ success: true });
});

app.use(checkUser, authRoutes);
