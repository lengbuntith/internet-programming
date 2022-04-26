const { Router } = require("express");
const pricesController = require("../controllers/pricesController");
const { requireAuthAdmin } = require("../middleware/authMiddleware");

const router = Router();

router.get("/all", pricesController.get_all);
router.post("/create", requireAuthAdmin, pricesController.create_new);
router.post("/delete/:id", requireAuthAdmin, pricesController.delete_by_id);
router.post("/update/:id", requireAuthAdmin, pricesController.update_by_id);
module.exports = router;
