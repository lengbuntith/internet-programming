const Product = require("../models/Product");

const get_all = async (req, res) => {
  try {
    const all = await Product.find();
    res.json({ success: true, data: all });
  } catch (error) {
    res.json({ success: false, error: error });
  }
};

const get_by_filter = async (req, res) => {
  const { cat_id, sub_id } = req.query;

  try {
    let filter = {};
    if (cat_id) filter.category = cat_id;
    if (sub_id) filter.subcategory = sub_id;
    console.log(filter);
    const doc = await Product.find(filter);
    res.json({ success: true, data: doc });
  } catch (error) {
    res.json({ success: false, error: error });
  }
};

const create_new = async (req, res) => {
  const { name, description, price, cat_id, sub_id } = req.body;

  try {
    const doc = await Product.create({
      name: name,
      description: description,
      price: price,
      category: cat_id,
      subcategory: sub_id,
    });

    await doc.save();

    res.json({ success: true, data: doc });
  } catch (error) {
    res.json({ success: false, error: error });
  }
};

const delete_by_id = async (req, res) => {
  const { id } = req.params;
  try {
    const deleting = await Product.deleteOne({ _id: id });
    res.json({ success: true, data: deleting });
  } catch (error) {
    res.json({ success: false, error: error });
  }
};

const update_by_id = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, cat_id, sub_id } = req.body;

  try {
    const doc = await Product.findById(id);

    if (name) doc.name = name;
    if (description) doc.description = description;
    if (price) doc.price = price;
    if (cat_id) doc.category = cat_id;
    if (sub_id) doc.subcategory = sub_id;

    await doc.save();

    res.json({ success: true, data: doc });
  } catch (error) {
    res.json({ success: false, error: error });
  }
};

module.exports = {
  get_all,
  create_new,
  get_by_filter,
  delete_by_id,
  update_by_id,
};
