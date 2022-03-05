const express = require("express");
const app = express();
const fs = require("fs");
const port = 3000;

app.use(express.static("assets"));

app.get("/", (req, res) => {
  try {
    let html = fs.readFileSync("./views/index.html", "utf8");
    res.send(html);
  } catch (err) {
    console.error(err);
  }
});

app.get("/book-detail", (req, res) => {
  try {
    let html = fs.readFileSync("./views/book-detail.html", "utf8");
    res.send(html);
  } catch (err) {
    console.error(err);
  }
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
