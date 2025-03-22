const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");
const { loginCheck, isAuth, isAdmin } = require("../middleware/authentification");

router.post("/isadmin", authController.isAdmin);
router.post("/signup", authController.Signup);
router.post("/signin", authController.Signin);
router.post("/user", loginCheck, isAuth, isAdmin, authController.allUser);

module.exports = router;