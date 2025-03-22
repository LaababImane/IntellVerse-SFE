const express = require("express");
const router = express.Router();
const ordersController = require("../controller/orders");

router.get("/get-all-orders", ordersController.getAllOrders);
router.post("/order-by-user", ordersController.getOrderByUser);

router.post("/create-order", ordersController.CreateOrder);
router.post("/update-order", ordersController.UpdateOrder);
router.post("/delete-order", ordersController.DeleteOrder);

module.exports = router;