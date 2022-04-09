const Prices = require("../models/Prices");
const Product = require("../models/Product");

//get all prices
const get_all = async (req, res) => {
  try {
    const getting = await Prices.find();
    console.log(getting);
    res.json({ success: true, data: getting });
  } catch (error) {
    res.json({ success: false, error: error });
  }
};

//create a new price for a product
const create_new = async (req, res) => {
  console.log("create prices");
  const { product_id, source, price } = req.body;

  try {
    //creating new prices
    const creating = await Prices.create({
      product: product_id,
      source: source,
      price: price,
    });

    await creating.save();

    //update/assign new price to product prices array
    const productById = await Product.findById(product_id);
    productById.prices.push(creating);
    await productById.save();

    //response
    console.log(creating);
    res.json({ success: true, data: creating });
  } catch (error) {
    res.json({ success: false, error: error });
  }
};

//delete a price
const delete_by_id = async (req, res) => {
  const { id } = req.params;

  try {
    const deleting = await Prices.deleteOne({ _id: id });
    console.log("deleting", deleting);
    res.json({ success: true, data: deleting });
  } catch (error) {
    res.json({ success: false, error: error });
  }
};

//update a price by id
const update_by_id = async (req, res) => {
  const { id } = req.params;
  const { source, price } = req.body;

  console.log(id, source, price);

  try {
    const doc = await Prices.findById(id);
    //update data
    if (source) doc.source = source;
    if (price) doc.price = price;

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
