const Category = require("../models/Category");

const get_all = async (req, res) => {
  try {
    const getting = await Category.find().populate("subcategories");
    console.log(getting);
    res.json({ success: true, data: getting });
  } catch (error) {
    res.json({ success: false, error: error });
  }
};

const get_by_id = async (req, res) => {
  const { id } = req.params;

  try {
    const getting = await Category.findById(id).populate("subcategories");
    console.log(getting);
    res.json({ success: true, data: getting });
  } catch (error) {
    res.json({ success: false, error: error });
  }
};

const create_new = async (req, res) => {
  const { name, description, imageUrl } = req.body;

  try {
    const creating = await Category.create({
      name: name,
      description: description,
      imageUrl: imageUrl
    });
    console.log(creating);
    res.json({ success: true, data: creating });
  } catch (error) {
    res.json({ success: false, error: error });
  }
};

const delete_by_id = async (req, res) => {
  const { id } = req.params;

  try {
    const deleting = await Category.deleteOne({ _id: id });
    console.log("deleting", deleting);
    res.json({ success: true, data: deleting });
  } catch (error) {
    res.json({ success: false, error: error });
  }
};

const update_by_id = async (req, res) => {
  const { id } = req.params;
  const { name, description, imageUrl } = req.body;

  console.log(id, name);

  try {
    const doc = await Category.findById(id);
    //update data
    if(name) doc.name = name;
    if(description) doc.description = description;
    if(imageUrl) doc.imageUrl = imageUrl
    await doc.save();
    res.json({ success: true, data: doc });
  } catch (error) {
    res.json({ success: false, error: error });
  }
};

module.exports = {
  get_all,
  get_by_id,
  create_new,
  delete_by_id,
  update_by_id,
};
