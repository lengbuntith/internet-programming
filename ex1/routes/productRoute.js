const { Router } = require("express");
const productController = require("../controllers/productController");

const router = Router();

router.get("/all", productController.get_all);
router.get("/filter", productController.get_by_filter);
router.post("/create", productController.create_new);
router.post("/delete/:id", productController.delete_by_id);
router.post("/update/:id", productController.update_by_id);

module.exports = router;
