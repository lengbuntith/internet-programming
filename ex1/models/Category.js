const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" }],
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
});

module.exports = mongoose.model("Category", categorySchema);
