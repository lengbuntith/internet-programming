const { Router } = require("express");
const categoryController = require("../controllers/categoryController");
const router = Router();

router.get("/all", categoryController.get_all);
router.get("/:id", categoryController.get_by_id);
router.post("/create", categoryController.create_new);
router.post("/delete/:id", categoryController.delete_by_id);
router.post("/update/:id", categoryController.update_by_id);
module.exports = router;
