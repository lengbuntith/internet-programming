const { Router } = require("express");
const authController = require("../controllers/authController");

const router = Router();

router.post("/login", authController.login);
router.post("/register", authController.register);

module.exports = router;
