const express = require("express");
const router = express.Router();
const usersController = require("../controller/users");

router.get("/all-user" , usersController.getAllUser);
router.post("/signle-user" , usersController.getSingleUser);
router.get("/get-userByDay" , usersController.getUserByDay);

router.post("/add-user" , usersController.AddUser);
router.post("/edit-user" , usersController.EditUser);
router.post("/delete-user" , usersController.getDeleteUser);

router.post("/change-password" , usersController.changePassword);

module.exports = router ;