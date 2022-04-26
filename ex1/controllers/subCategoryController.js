const SubCategory = require("../models/SubCategory");
const Category = require("../models/Category");

const get_all = async (req, res) => {
  try {
    const getting = await SubCategory.find().populate("category");
    console.log(getting);
    res.json({ success: true, data: getting });
  } catch (error) {
    res.json({ success: false, error: error });
  }
};

const create_new = async (req, res) => {
  const { name, cat_id } = req.body;

  try {
    //creating new subcategory
    const creating = await SubCategory.create({
      name: name,
      category: cat_id,
    });
    await creating.save();

    //update/assign new subcategory to subcategories array
    const categoryById = await Category.findById(cat_id);
    categoryById.subcategories.push(creating);
    await categoryById.save();

    //response
    console.log(creating);
    res.json({ success: true, data: creating });
  } catch (error) {
    res.json({ success: false, error: error });
  }
};

const delete_by_id = async (req, res) => {
  const { id } = req.params;

  try {
    //get subcategory detail
    const doc = await SubCategory.findById(id);
    //remove sub from old category
    const oldCat = await Category.findById(doc.category);
    let index = oldCat.subcategories.findIndex((s) => s._id == id);
    if (index == -1) return res.json({ success: false });
    oldCat.subcategories.splice(index, 1);
    await oldCat.save();

    const deleting = await SubCategory.deleteOne({ _id: id });
    console.log("deleting", deleting);

    res.json({ success: true, data: deleting });
  } catch (error) {
    res.json({ success: false, error: error });
  }
};

const update_by_id = async (req, res) => {
  const { id } = req.params;
  const { name, cat_id } = req.body;

  console.log(id, name, cat_id);

  try {
    const doc = await SubCategory.findById(id);
    //update data
    if (name) doc.name = name;
    //update category if req cat id is different from old
    if (doc.category != cat_id) {
      //remove sub from old category
      const oldCat = await Category.findById(doc.category);
      let index = oldCat.subcategories.findIndex((s) => s._id == id);
      if (index == -1) return res.json({ success: false });
      oldCat.subcategories.splice(index, 1);
      await oldCat.save();

      //update new category
      doc.category = cat_id;
      await doc.save();
      //update/assign new subcategory to subcategories array
      const categoryById = await Category.findById(cat_id);
      categoryById.subcategories.push(doc);
      await categoryById.save();
    }

    await doc.save();
    res.json({ success: true, data: doc });
  } catch (error) {
    res.json({ success: false, error: error });
  }
};

module.exports = {
  get_all,
  create_new,
  delete_by_id,
  update_by_id,
};
