const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

//route import
const authRoute = require("./routes/authRoute");
const productRoute = require("./routes/productRoute");
const categoryRoute = require("./routes/categoryRoute");
const SubCategoryRoute = require("./routes/subCategoryRoute");
const pricesRoute = require("./routes/pricesRoute");

const app = express();
const port = 3001;

//middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//connect mongoDB
const uri = "mongodb://localhost:27017/tp12";
mongoose
  .connect(uri)
  .then((result) => app.listen(port))
  .catch((err) => console.log(err));

//home
app.get("/", (req, res) => {
  res.json({ work: true });
});

app.use("/auth", authRoute);
app.use("/product", productRoute);
app.use("/category", categoryRoute);
app.use("/subcategory", SubCategoryRoute);
app.use("/prices", pricesRoute);
