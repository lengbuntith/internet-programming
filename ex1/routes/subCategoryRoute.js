const { Router } = require("express");
const subCategoryController = require("../controllers/subCategoryController");
const { requireAuthAdmin } = require("../middleware/authMiddleware");

const router = Router();

router.get("/all", subCategoryController.get_all);
router.post("/create", requireAuthAdmin, subCategoryController.create_new);
router.post("/delete/:id", requireAuthAdmin, subCategoryController.delete_by_id);
router.post("/update/:id", requireAuthAdmin, subCategoryController.update_by_id);
module.exports = router;
