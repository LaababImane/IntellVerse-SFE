const express = require("express");
const router = express.Router();
const blogController = require("../controller/blog");
const multer = require("multer");
const { loginCheck } = require("../middleware/authentification");

// Image Upload setting
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/blogs");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/all-blog", blogController.getAllBlog);
router.post("/add-blog",loginCheck, upload.single("bImage"), blogController.AddBlog);
router.post("/edit-blog", loginCheck, blogController.EditBlog);
router.post("/delete-blog",loginCheck,blogController.DeleteBlog);

module.exports = router;