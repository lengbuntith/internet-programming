const { Router } = require("express");
const productController = require("../controllers/productController");
const { requireAuthAdmin } = require("../middleware/authMiddleware");

const router = Router();

router.get("/all", productController.get_all);
router.get("/all_populate", productController.get_all_populate);
router.get("/:id", productController.get_by_id);
router.get("/filter", productController.get_by_filter);
router.post("/create", requireAuthAdmin, productController.create_new);
router.post("/delete/:id", requireAuthAdmin, productController.delete_by_id);
router.post("/update/:id", requireAuthAdmin, productController.update_by_id);

module.exports = router;
