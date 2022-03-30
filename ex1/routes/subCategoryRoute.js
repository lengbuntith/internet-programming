const { Router } = require("express");
const subCategoryController = require("../controllers/subCategoryController");
const router = Router();

router.get("/all", subCategoryController.get_all);
router.post("/create", subCategoryController.create_new);
router.post("/delete/:id", subCategoryController.delete_by_id);
router.post("/update/:id", subCategoryController.update_by_id);
module.exports = router;
