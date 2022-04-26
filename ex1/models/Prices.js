const mongoose = require("mongoose");

const pricesSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  source: {
    type: String,
  },
  price: {
    type: Number,
  },
});

module.exports = mongoose.model("Prices", pricesSchema);
