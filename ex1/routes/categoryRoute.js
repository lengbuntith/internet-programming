const { Router } = require("express");
const categoryController = require("../controllers/categoryController");
const { requireAuthAdmin } = require("../middleware/authMiddleware");
const router = Router();

router.get("/all", categoryController.get_all);
router.get("/:id", categoryController.get_by_id);
router.post("/create", requireAuthAdmin, categoryController.create_new);
router.post("/delete/:id", requireAuthAdmin, categoryController.delete_by_id);
router.post("/update/:id", requireAuthAdmin, categoryController.update_by_id);
module.exports = router;
