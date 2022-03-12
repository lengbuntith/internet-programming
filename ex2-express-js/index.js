const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const port = 3001;
app.use(cors());
app.use(express.json());

//login
app.post("/login", (req, res) => {
  // get user from body request
  const user = req.body;
  console.log("user", user);

  // check user credential
  const Credential = checkCredential(user);

  // send to client
  res.json(Credential);
});

//register
app.post("/register", (req, res) => {
  console.log(req.body);

  const user = {
    username: req.body.username,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
  };

  const write = writeData(user);

  res.json(write);
});

function writeData(user) {
  // check if user is exist
  const check = checkIsExist(user);

  // if exist return message and stop code
  if (check.status == true) {
    return { success: false, error: "User is already existed~" };
  }

  // read user json
  const read = readData();

  // append user
  read.push(user);

  // convert JSON object to string
  const data = JSON.stringify(read);

  try {
    fs.writeFileSync("user.json", data);
    return { success: true, data: user };
  } catch (error) {
    return { success: false, error: "something went wrong" };
  }
}

function readData() {
  // read JSON object from file
  try {
    const data = fs.readFileSync("user.json", "utf-8");
    const user = data ? JSON.parse(data) : [];
    //console.log("read user", user);

    return user;
  } catch (error) {
    console.log(error);

    return error;
  }
}

function checkIsExist(user) {
  console.log("check", user);
  const read = readData();
  console.log("check", read);

  let index = -1;

  for (let i = 0; i < read.length; i++) {
    if (read[i].email == user.email || read[i].username == user.username) {
      index = i;
      break;
    }
  }

  console.log("check ", index);

  if (index == -1) {
    return {
      status: false,
      data: [],
    };
  } else {
    return {
      status: true,
      data: read[index],
    };
  }
}

function checkCredential(user) {
  const read = readData();

  let index = -1;

  for (let i = 0; i < read.length; i++) {
    if (read[i].email == user.email && read[i].password == user.password) {
      index = i;
      break;
    }
  }

  if (index == -1) {
    return { success: false, error: "The user's information is incorrect~" };
  } else {
    return read[index];
  }
}

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
