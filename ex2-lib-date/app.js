const { KhmerDate } = require("./lib/index.js");
const kd = new KhmerDate(new Date("2022-02-01T17:30:55.839Z"));
console.log(kd.getDate());