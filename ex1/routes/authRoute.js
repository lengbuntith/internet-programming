const { Router } = require("express");
const authController = require("../controllers/authController");
const { requireAuth, checkUser } = require("../middleware/authMiddleware");

const router = Router();

router.post("/login", checkUser, authController.login);
router.post("/register", checkUser, authController.register);
router.get("/user/:id", requireAuth, authController.get_user);
router.get("/logout", authController.logout);
router.get("/me", requireAuth, authController.get_me);
router.post("/user/update", requireAuth, authController.update_user);
router.post("/user/update-password", requireAuth, authController.update_password);
router.post("/user/delete-user", requireAuth, authController.delete_user);
router.post("/admin/login", checkUser, authController.admin_login)


module.exports = router;
