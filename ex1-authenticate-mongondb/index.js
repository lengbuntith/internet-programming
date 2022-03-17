const express = require("express");
const fs = require("fs");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");

const app = express();
const port = 3001;

//middleware
app.use(cors());
app.use(express.json());

//connect mongoDB
const uri = "mongodb://localhost:27017/tp09";
mongoose
  .connect(uri)
  .then((result) => app.listen(port))
  .catch((err) => console.log(err));

//routes
app.get("/", (req, res) => {
  res.send("hello");
});

app.use(authRoutes);
