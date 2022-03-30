const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

//route import
const productRoute = require("./routes/productRoute");
const categoryRoute = require("./routes/categoryRoute");
const SubCategoryRoute = require("./routes/subCategoryRoute");

const app = express();
const port = 3001;

//middleware
app.use(cors());
app.use(express.json());

//connect mongoDB
const uri =
  "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false";
mongoose
  .connect(uri)
  .then((result) => app.listen(port))
  .catch((err) => console.log(err));

//home
app.get("/", (req, res) => {
  res.json({ work: true });
});

//products
app.use("/product", productRoute);
app.use("/category", categoryRoute);
app.use("/subcategory", SubCategoryRoute);
