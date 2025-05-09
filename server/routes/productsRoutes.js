const express = require("express");
const router = express.Router();
const productController = require("../controller/products");
const multer = require("multer");

var storage = multer.diskStorage({
    destination : function(req , file , cb){
        cb(null , "public/uploads/products");
    },
    filename : function(req , file , cb){
        cb(null , Date.now() + "_" + file.originalname);
    },
});

const upload = multer({ storage: storage });
router.get("/all-product", productController.getAllProduct);
router.post("/product-by-category", productController.getProductByCategory);
router.post("/product-by-price", productController.getProductByPrice);

router.post("/cart-product", productController.getCartProduct);

router.post("/add-product", upload.any(), productController.AddProduct);
router.post("/edit-product", upload.any(), productController.EditProduct);
router.post("/delete-product", productController.getDeleteProduct);
router.post("/single-product", productController.getSingleProduct);

module.exports = router;
