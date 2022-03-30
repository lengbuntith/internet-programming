const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subcategories: [
    { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" }
  ],
});

module.exports = mongoose.model("Category", categorySchema);
